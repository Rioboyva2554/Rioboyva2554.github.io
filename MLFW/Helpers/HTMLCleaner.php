<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork HTML Cleaner helper class
 * 
 *  Removes unallowed HTML tags or tag attributes
 *  ================================ **/

namespace MLFW\Helpers;
use function MLFW\_dbg, MLFW\app;


class HTMLCleaner {
  const TAGS_MINIMUM = [
    'a'=>['href','target'],
    'img'=>['alt','src','height','width']
  ];

  const TAGS_MEDIA = [
    'video'=>['src','width','height','loop','muted','controls'],
    'source'=>['src','type'],
    'audio'=>['src','controls','loop']
  ];

  const TAGS_INLINE = [
    'a'=>['href','target'],
    'img'=>['alt','src','height','width'],
    'br'=>[],
    'b'=>[],
    'i'=>[],
    'u'=>[],
    'strong'=>[],
    'em'=>[],
    'del'=>[]
  ];

  const TAGS_FORMAT = [
    'p'=>[],
    'table'=>[],
    'tr'=>[],
    'td'=>['colspan','rowspan'],
    'thead'=>[],
    'tbody'=>[],
    'tfooter'=>[],
    'th'=>['colspan'],
    'ol'=>[],
    'ul'=>[],
    'li'=>[]
  ];
  /** Cleans unallowed HTML tags or attributes
   * @param string $html HTML code to cleanup
   * @param array $tags Hash array of allowed tags and attributes. The keys of 
   * 
   */
  public static function clean(string $html,array $tags=HTMLCleaner::TAGS_INLINE):string {
    $charset = app()->config('charset','UTF-8');
    $html = \strip_tags($html,'<'.\join('><',\array_keys($tags)).'>'); // at first clean tags except allowed
    $html = \mb_encode_numericentity($html, [0x80, 0x10FFFF, 0, ~0], $charset);
    if (!\class_exists('\\DOMDocument')) throw new \MLFW\ExceptionMisconfig('DOM extension not loaded!');
    $dom = new \DOMDocument();
    $dom->formatOutput = false;
    $dom->loadHTML($html, LIBXML_NONET|LIBXML_HTML_NOIMPLIED|LIBXML_HTML_NODEFDTD); // LIBXML_NONET — for protection against XXE, LIBXML_HTML_NOIMPLIED|LIBXML_HTML_NODEFDTD — to don't add DOCTYPE and html/body tags
    $xpath = new \DOMXPath($dom);      
    $nodes = $xpath->query('//@*'); // finding all tags with attributes
    foreach ($nodes as $node) { 
      if (!empty($tags[$node->parentNode->nodeName])) { // if tag in in list, checking attribute
        $attrs = is_array($tags[$node->parentNode->nodeName]) ? $tags[$node->parentNode->nodeName] : [$tags[$node->parentNode->nodeName]]; // if string specified as value, convert it to array
        if (!in_array($node->nodeName,$attrs)) $node->parentNode->removeAttribute($node->nodeName); // if attribute is not in allowed list, remove it
      }
    }
    $links = $xpath->query('//@href|//@src');
    foreach ($links as $link) {
      $scheme = parse_url($link->textContent,PHP_URL_SCHEME);
      if (strpos(strtolower($scheme),'script')!==false) {        
        $link->parentNode->textContent = 'INSECURE LINK REMOVED: '.htmlspecialchars($link->nodeValue,ENT_QUOTES|ENT_SUBSTITUTE,$charset); // show, why link was removed (for admins, moderators and so on)
        $link->nodeValue='#'; // removing dangerous link address
      }
    }
    return $dom->saveHTML();
  }
}