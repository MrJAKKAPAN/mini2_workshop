<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Validator;
use App\Product;

class ProductController extends Controller
{
    public function __construct (){
        $this->middleware('jwt.auth', ['except' => ['index', 'show','clientIndex', 'clientShow']]);    
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = DB::table('products')
                    ->select('products.*', DB::raw("(SELECT COUNT(*) FROM views WHERE views.product_id = products.id) as views "))
                    ->get();
        return response()->json([
            'status' => true,
            'response' => $product,
            'message' =>"All Data"
        ], 200);
    }

    public function clientIndex()
    {
        $product = DB::table('products')
                    ->select('products.*', DB::raw("(SELECT COUNT(*) FROM views WHERE views.product_id = products.id) as views "))
                    ->where('status', 1)
                    ->get();
        return response()->json([
            'status' => true,
            'response' => $product,
            'message' =>"All Data"
        ], 200);
    }

    public function active(Request $request, $id)
    {
        $product = Product::find($id);
        $product->status = $request->status;
        $product->update();
        return response()->json([
            'status' => $product,
            'message' => 'Active Data Success!'
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'subject' => 'required|max:255',
            'title' => 'required|max:255',
            'price' => 'required|max:11',
            'image' => 'required|max:255',
            'status' => 'required'
        ];

        $validator = Validator::make($request->all(), $rules);
        
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ],400);
        }
        $product = Product::create($request->all());
        return response()->json([
            'status' => true,
            'response' => $product,
            'message' => 'Create Data Success!'
        ],200);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function clientShow($id)
    {
        $product = Product::where('id', $id)
                            ->where('status', 1)
                            ->first();
        if (is_null($product)){
            return response()->json(['status' => false, 'message' =>"Record not found!"], 404);
        }
        return response()->json(['status' => true,'response' => $product,'message' =>"Reccord By ID Success"], 200);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (is_null($product)){
            return response()->json(['status' => false, 'message' =>"Record not found!"], 404);
        }
        return response()->json(['status' => true,'response' => $product,'message' =>"Reccord By ID Success"], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $product = Product::find($id);
        return response()->json([
            'status' => true,
            'response' => $product,
            'message' =>"All Data"
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $rules = [
            'subject' => 'required|max:255',
            'title' => 'required|max:255',
            'price' => 'required|max:11',
            'image' => 'required|max:255',
            'status' => 'required'
        ];

        $validator = Validator::make($request->all(), $rules);
        
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ],400);
        }
        
        $product = Product::where('id', $id)->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Update Data Success!'
        ],200);
        

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::destroy($id);
        if (!empty($product)) {
            return response()->json([
                'status' => true,
                'message' => 'Reccord destroy successfully.'
            ],200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Error'
            ],400); 
        }
    }
}
