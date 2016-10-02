import {NutritionixSearchHit} from './nutritionix.search.hit'; 
export class NutritionixSearchResults {
  total_hits: number;
  max_score: number;
  hits: NutritionixSearchHit[];
}


// {
//  "total_hits": 4787,
//  "max_score": 4.324818,
//  "hits": [
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
//   {
//    "_index": "f762ef22-e660-434f-9071-a10ea6691c27",
//    "_type": "item",
//    "_id": "513fc9cd673c4fbc26006c3e",
//    "_score": 4.0640044,
//    "fields": {
//     "item_id": "513fc9cd673c4fbc26006c3e",
//     "item_name": "Taco",
//     "brand_id": "513fbc1283aa2dc80c00042c",
//     "brand_name": "Taco Tico",
//     "nf_serving_size_qty": 1,
//     "nf_serving_size_unit": "serving"
//    }
//   },
