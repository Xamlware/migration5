import {NutritionixSearchHitField} from './nutritionix.search.hit.field'; 
export class NutritionixSearchHit
{
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  fields: NutritionixSearchHitField;
}

// "hits": [
//   {
//    "_index": "f762ef22-e660-434f-9071-a10ea6691c27",
//    "_type": "item",
//    "_id": "513fc9cb673c4fbc2600536a",
//    "_score": 4.324818,
//    "fields": {
//     "item_id": "513fc9cb673c4fbc2600536a",
//     "item_name": "Taco",
//     "brand_id": "513fbc1283aa2dc80c000b96",
//     "brand_name": "Taco Inn",
//     "nf_serving_size_qty": 1,
//     "nf_serving_size_unit": "serving"
//    }
//   },
//   }