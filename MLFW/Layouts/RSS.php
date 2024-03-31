<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork RSS layout class 
 *  ================================ **/

namespace MLFW\Layouts;

use MLFW\Debug;

use function \MLFW\app;

class RSS extends HTML {
  /** @var \DOMDocument $xml The whole RSS Document */
  protected \DOMDocument $xml;
  /** @var \DOMElement $channel_node The <channel> tag in RSS Document to add items to. */
  protected \DOMElement $channel_node;

  /** Passes root object to parent constructor to set metadata and sets the MIME type for RSS. */
  function __construct(\MLFW\Models\Entity $obj = null) {
    parent::__construct($obj);
    $this->setMime('application/xml');
  }

/** Iterates all subitems of specified object recursively if they are iterable.
  * If subitem class is \MLFW\Entity or \MLFW\Template with \MLFW\Entity inside, 
  * the data from it will be extracted and added to RSS feed.
  * @param iterable $obj Root object to iterate. On the first call $this object is passed.
  * */
 
  protected function iterateItems(iterable $obj):void {
    foreach ($obj as $item_element) {
      $item = false;
      if (is_subclass_of($item_element,'\\MLFW\\Entity')) $item = $item_element;
      if (is_subclass_of($item_element,'\\MLFW\\Template') && is_subclass_of($item_element->data, '\\MLFW\\Models\\Entity')) $item = $item_element->getData();
      if ($item) {
        $item_node = $this->channel_node->appendChild($this->xml->createElement("item")); 
        $item_node->appendChild($this->xml->createElement("title", $item->title)); 
        if (!empty($item->url)) $item_node->appendChild($this->xml->createElement("link", $item->url)); 
        // TODO: Add author tag if needed?

        //Unique identifier for the item (GUID)
        $guid_link = $this->xml->createElement("guid", $item->id);
        $guid_link->setAttribute("isPermaLink", "false");
        $item_node->appendChild($guid_link);

        //create "description" node under "item"
        $description_node = $item_node->appendChild($this->xml->createElement("description"));
        //fill description node with CDATA content
        $description_contents = $this->xml->createCDATASection($item->text);
        $description_node->appendChild($description_contents);

        //Published date
        $date_rfc = (!empty($item->last_modified)) ? $item->last_modified->format(DATE_RFC2822) : $item->created->format(DATE_RFC2822);
        $pub_date = $this->xml->createElement("pubDate", $date_rfc);
        $item_node->appendChild($pub_date);

        // TODO: Add enclosure tags
      }

      if (is_iterable($item)) $this->iterateItems($item);
    }
  }

  public function getTemplate(): string {
    $this->xml = new \DOMDocument("1.0", "UTF-8"); // Create new DOM document.

    //create "RSS" element
    $rss = $this->xml->createElement("rss");
    $rss_node = $this->xml->appendChild($rss); //add RSS element to XML node
    $rss_node->setAttribute("version", "2.0"); //set RSS version

    //set attributes
    $rss_node->setAttribute("xmlns:dc", "http://purl.org/dc/elements/1.1/"); 
    $rss_node->setAttribute("xmlns:content", "http://purl.org/rss/1.0/modules/content/"); 
    $rss_node->setAttribute("xmlns:atom", "http://www.w3.org/2005/Atom"); 

    //Create RFC822 Date format to comply with RFC822
    $build_date = \gmdate(\DATE_RFC2822);

    //create "channel" element under "RSS" element
    $channel = $this->xml->createElement("channel");
    $this->channel_node = $rss_node->appendChild($channel);

    //a feed should contain an atom:link element (info http://j.mp/1nuzqeC)
    $url = false;
    if (!empty($this->links)) {
      $canonical = array_filter($this->links,function ($item) { return $item['rel']==='canonical'; });
      if (!empty($canonical[0])) $url = $canonical[0]['href'];
    }
    if (empty($url)) {
      $protocol = !empty($_SERVER['HTTPS']) || app()->config('force_https',false) ? "https" : "http";
      $host = $_SERVER['HTTP_HOST'];
      $path = $_SERVER['REQUEST_URI'];
      $url = $protocol . "://" . $host . $path;   
    }

    $channel_atom_link = $this->xml->createElement("atom:link");
    $channel_atom_link->setAttribute("href", $url); //url of the feed
    $channel_atom_link->setAttribute("rel", "self");
    $channel_atom_link->setAttribute("type", "application/rss+xml");
    $this->channel_node->appendChild($channel_atom_link);

    //add general elements under "channel" node
    $this->channel_node->appendChild($this->xml->createElement("title", $this->title));
    if (!empty($this->meta['description'])) $this->channel_node->appendChild($this->xml->createElement("description", $this->meta['description']));
    $this->channel_node->appendChild($this->xml->createElement("link", $url)); 
    $this->channel_node->appendChild($this->xml->createElement("language", app()->getLanguage()));
    $this->channel_node->appendChild($this->xml->createElement("lastBuildDate", $build_date));
    $this->channel_node->appendChild($this->xml->createElement("generator", "MindLife FrameWork RSS generator"));
    
    $this->iterateItems($this);
    return $this->xml->saveXML();
  }

}