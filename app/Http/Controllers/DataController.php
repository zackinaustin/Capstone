<?php namespace App\Http\Controllers;

use App\Models\Classified;
use DB;
use Illuminate\Http\Request;

/**
 * Class DataController
 * @package App\Http\Controllers
 */
class DataController extends Controller
{
    /**
     * Create a new controller instance.
     *
     */
    public function __construct()
    {

    }

    /**
     * test if works
     *
     * @return string
     */
    public function test()
    {
        return "It works now";
    }

    /**
     * @return $this
     */
    public function index(){
        $makes=Classified::select('make')->groupBy('make')->get();
        $models=Classified::select('model')->groupBy('model')->get();
        return view('data')->with(['makes'=>$makes,'models'=>$models]);


    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function Popularity(Request $request)
    {
        $isWeb = 1;
        $adTypes = array('dealer', 'carsforsale');
        if ($request->has('adType')){
            $adType_val=$request->input('adType');
            $adTypes=[];
            if(is_array($adType_val)){

                foreach($adType_val as $adType){
                    array_push($adTypes,$adType);
                }
            }else{
                array_push($adTypes,$adType_val);
            }

        }
        $make = $request->input('make');

        $selectField = array('year', DB::raw('count(distinct(id)) as Num_id'), DB::raw('avg(counter) as Avg_counter'),DB::raw('avg(price) as Avg_price'));
        $classifieds = Classified::select($selectField)->where('is_web', '=', $isWeb)->whereIn('adtype', $adTypes)->whereIn('make', $make)->groupBy('year');
        if ($request->has('model')){
            $model = $request->input('model');
            $classifieds=$classifieds->whereIn('model', $model);

        }
        $classifieds=$classifieds->get();
        return $classifieds;

    }

    /**
     * return the models that the make have. Make in array
     * @param Request $request
     * @return array|string
     */
    public function updateModelByMake(Request $request){
        $makes=$request->input('make');
        $selectField=array('model');
        $makes=Classified::select($selectField)->whereIn('make',$makes)->groupBy('model')->get();
        return $makes;

    }

    public function marketSharebyMake(Request $req){


        $yearRange=$req->input('yearRange');
        $selectField=array(DB::raw('count(id) as count'),'make');
        $shares=Classified::select($selectField)->whereBetween('year',$yearRange)->groupBy('make')->orderBy('count','desc');

        if($req->has('make')){
            $makes=$req->input('make');
            $shares=$shares->WhereIn('make',$makes);
        }
        $result=$shares->get();
        return $result;


    }

    public function makeComparison(Request $req){
        $yearRange=$req->input('yearRange');
        $makes=$req->input('make');
        $selectField=DB::raw('make, avg(counter) as avg_counter, avg(price) as avg_price, count(id) as numbers,avg(contacted) as avg_contacted');
        $makes=Classified::select($selectField)->whereBetween('year',$yearRange)->WhereIn('make',$makes)->groupBy('make')->orderBy('numbers','desc')->get();
        return $makes;
    }

}