<?php

namespace MLFW\Models;

use DateTime;
use MLFW\Models\Entity as ModelsEntity;

use function \MLFW\app, \MLFW\_dbg;

class DbEntity extends ModelsEntity {
  const FIELDS = ['id','status','type','owner','title','url','descr','seo_title','seo_descr','seo_keywords','rating_pro','rating_contra']; // No text and extra fields, they should be added manually if needed!

  public $status=0;
  public $type;
  public $owner=null;
  public $title;
  public $url=null;  
  public $descr;
  public $text=false;
  public $seo_title;
  public $seo_descr;
  public $seo_keywords;
  public $rating_pro=0;
  public $rating_contra=0;

  static function getById(int|string $id):DbEntity {
    $sql = 'SELECT e.* FROM entity e WHERE id=:id';
    $stmt=app()->db->prepare($sql);
    $stmt->execute(['id'=>$id]);
    $stmt->setFetchMode(\PDO::FETCH_CLASS, '\\MLFW\\Models\\DbEntity');
    $result = $stmt->fetch(\PDO::FETCH_CLASS);
    return $result;
  }

  static function getByUrl(string $url) {
    $sql = 'SELECT e.* FROM entity e WHERE url=:url';
    $stmt=app()->db->prepare($sql);
    $stmt->execute(['url'=>$url]);
    $stmt->setFetchMode(\PDO::FETCH_CLASS, '\\MLFW\\Models\\DbEntity');
    $result = $stmt->fetch(\PDO::FETCH_CLASS);
    return $result;
  }

  static function getClass(string $url) {
    $sql = 'SELECT et.classname FROM entity e, entity_type et WHERE url=:url AND e.type=et.id';
    $stmt=app()->db->prepare($sql);
    $stmt->execute(['url'=>$url]);
    $classname = $stmt->fetchColumn();
    return $classname;
  }

  static function getRelated($id, int $rel_type,bool $texts=false,bool $extra=false) {
    $id=self::extractId($id);
    $columns = ''.join(',',self::FIELDS).',created,last_modified'; // Manually adding time fields
    if ($texts) $columns.=',texts';
    if ($extra) $columns.=',extra';
    $sql = 'SELECT '.$columns.' FROM entity e, entity_relation er WHERE er.rel_from=:id AND e.id=er.rel_to AND rel_type=:type';
    $stmt=app()->db->prepare($sql);
    $stmt->execute(['id'=>$id,'type'=>$rel_type]);
    return $stmt->fetchAll(\PDO::FETCH_CLASS, '\\MLFW\\Models\\DbEntity');
  }

  static function getRelatedReverse(int $id, int $rel_type,bool $texts=false,bool $extra=false) {
    $id=self::extractId($id);
    $columns = ''.join(',',self::FIELDS).',created,last_modified';  // Manually adding time fields
    if ($texts) $columns.=',texts';
    if ($extra) $columns.=',extra';
    $sql = 'SELECT '.$columns.' FROM entity e, entity_relation er WHERE er.rel_to=:id AND e.id=er.rel_from AND rel_type=:type';
    $stmt=app()->db->prepare($sql);
    $stmt->execute(['id'=>$id,'type'=>$rel_type]);
    return $stmt->fetchAll(\PDO::FETCH_CLASS, '\\MLFW\\Models\\DbEntity');
  }

  static function extractId(int|DbEntity $obj):int|null {
    if ($obj instanceof self) return $obj->id;
    if (is_numeric($obj)) return intval($obj);
  }

  public static function load(array $conditions=[]):array {
    $sql = 'SELECT * FROM entity WHERE 1=1 ';
    // TODO: add conditions checking
    $stmt=app()->db->prepare($sql);
    $stmt->execute(['id'=>$conditions['id'],'type'=>$conditions['rel_type']]);    
    return $stmt->fetchAll(\PDO::FETCH_CLASS, '\\MLFW\\Models\\DbEntity');
  }

  function save():bool {
    $fields = self::FIELDS+['created','last_modified'];
    if ($this->text!==false) $fields+=['text'];
    if ($this->extra!==false) $fields+=['extra'];
    $data = [];
    foreach ($fields as $field) {
      if ($field==='extra') $data['extra']=$this->extra!==null ? json_encode($this->extra) : null;
      elseif ($field==='created' || $field==='last_modified') $data[$field]=$this->$field->format('Y-m-d H:i:s');
      else $data[$field]=$this->$field;
    }
    if ($this->id===null) {
      print_r($fields);
      $sql = 'INSERT INTO entity ('.join(',',$fields).') VALUES (:'.join(', :',$fields).')';
      $stmt = app()->db->prepare($sql);
      $stmt->execute($data);
      $this->id = app()->db->lastInsertId();
    }
    else {
      $pairs = join(',',array_map(function ($field) {
        return $field.='=:'.$field;
      },$fields));
      $sql = "UPDATE entity SET $pairs WHERE id=:id";
      $stmt = app()->db->prepare($sql);
      $stmt->execute($data);
    }
    return true; // TODO: add error checking
  }

  function addRelations($rels_to=[]) {
    if ($this->id===null) throw new \MLFW\ExceptionWrongData('Object has no id!');
    $sql = 'INSERT IGNORE INTO entity_relation(rel_from,rel_to,rel_type) VALUES ';
    foreach ($rels_to as $rel_id=>$rel_type) {
      $sql.=sprintf('(%d,%d,%d),',$this->id,$rel_id,$rel_type);
    }
    $sql = substr($sql,0,-1);

  }

  function saveRelations($rels_to=[]) {

  }

  function saveRelationsReverse($rels_from=[]) {

  }

  function delete():bool {
    if ($this->id!==null) {
      $sql = 'UPDATE entity SET status=1 WHERE id=:id';
      $stmt = app()->db->prepare($sql);
      return $stmt->execute(['id'=>$this->id]);
    }
    else return true;
  }

  public static function purge(): int {
    $sql = 'DELETE FROM entity_relation WHERE rel_from=(SELECT id FROM entity WHERE status=1) OR rel_to=(SELECT id FROM entity WHERE status=1)';
    $stmt = app()->db->prepare($sql);
    $result = $stmt->execute();
    $sql = 'DELETE FROM entity WHERE status=1';
    $stmt = app()->db->prepare($sql);
    $stmt->execute();
    return $stmt->rowCount();
  }
}