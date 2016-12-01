
//纬度 经度
var $pi = 3.14159265358979324; //const var $pi = 3.14159265358979324;
var $sa = 6378245.0; //const var $sa = 6378245.0; //Semimajor Axis
var $ee = 0.00669342162296594323; //const var $ee = 0.00669342162296594323;	//($sa^2-eb^2)/$sa^2,eb=$sa*(1-f),1/f = 298.3
var $x_pi = 0.1884955592153875944; //const var $x_pi = 3.14159265358979324 * 3000.0 / 180.0;
var _coor ={ //var $coor ||{纬,经};
	'$lat' : 0.0,
	'$lng' : 0.0
};
function outOfChina($lat, $lng){
	if($lng < 72.004 || $lng > 137.8347)
		return true;
	if($lat < 0.8293 || $lat > 55.8271)
		return true;
	return false;
}
function tLat($x, $y){
	var $ret = -100.0 + 2.0 * $x + 3.0 * $y + 0.2 * $y * $y + 0.1 * $x * $y + 0.2 * Math.sqrt(Math.abs($x));
	$ret +=(20.0 * Math.sin(6.0 * $x * $pi) + 20.0 * Math.sin(2.0 * $x * $pi)) * 2.0 / 3.0;
	$ret +=(20.0 * Math.sin($y * $pi) + 40.0 * Math.sin($y / 3.0 * $pi)) * 2.0 / 3.0;
	$ret +=(160.0 * Math.sin($y / 12.0 * $pi) + 320 * Math.sin($y * $pi / 30.0)) * 2.0 / 3.0;
	return $ret;
}
function tLng($x, $y){
	var $ret = 300.0 + $x + 2.0 * $y + 0.1 * $x * $x + 0.1 * $x * $y + 0.1 * Math.sqrt(Math.abs($x));
	$ret +=(20.0 * Math.sin(6.0 * $x * $pi) + 20.0 * Math.sin(2.0 * $x * $pi)) * 2.0 / 3.0;
	$ret +=(20.0 * Math.sin($x * $pi) + 40.0 * Math.sin($x / 3.0 * $pi)) * 2.0 / 3.0;
	$ret +=(150.0 * Math.sin($x / 12.0 * $pi) + 300.0 * Math.sin($x / 30.0 * $pi)) * 2.0 / 3.0;
	return $ret;
}
// from google to baidu
function g2b($coor){
	var $x = $coor.$lng,$y = $coor.$lat;
	var $z = Math.sqrt($x * $x + $y * $y) + 0.00002 * Math.sin($y * $x_pi);
	var $theta = Math.atan2($y, $x) + 0.000003 * Math.cos($x * $x_pi);
	$coor.$lng = $z * Math.cos($theta) + 0.0065;
	$coor.$lat = $z * Math.sin($theta) + 0.006;
}
//  baidu,from 原始original to 纠偏correct
function w2b($coor){
	w2g($coor);
	g2b($coor);
}
// from baidu to google
function b2g($coor){
	var $x = $coor.$lng - 0.0065,$y = $coor.$lat - 0.006;
	var $z = Math.sqrt($x * $x + $y * $y) - 0.00002 * Math.sin($y * $x_pi);
	var $theta = Math.atan2($y, $x) - 0.000003 * Math.cos($x * $x_pi);
	$coor.$lng = $z * Math.cos($theta);
	$coor.$lat = $z * Math.sin($theta);
}
// baidu,from 纠偏correct to 原始original
function b2w($coor){
	b2g($coor);
	g2w($coor);
}
// google,from 原始original to 纠偏correct
function w2g($coor){
	if(outOfChina($coor.$lat, $coor.$lng)){
		return;
	}
	var $dLat = tLat($coor.$lng - 105.0, $coor.$lat - 35.0);
	var $dLng = tLng($coor.$lng - 105.0, $coor.$lat - 35.0);
	var $radLat = $coor.$lat / 180.0 * $pi;
	var $magic = Math.sin($radLat);
	$magic = 1 - $ee * $magic * $magic;
	var $sqrtMagic = Math.sqrt($magic);
	$dLat =($dLat * 180.0) /(($sa *(1 - $ee)) /($magic * $sqrtMagic) * $pi);
	$dLng =($dLng * 180.0) /($sa / $sqrtMagic * Math.cos($radLat) * $pi);
	$coor.$lat += $dLat;
	$coor.$lng += $dLng;
}
// google,from 纠偏correct to 原始original
function g2w($coor){
	var $cr = clone($coor);	//var $cr = Object.create($coor);

	var $xy = clone($coor);
	w2g($xy);
	$coor.$lng +=($cr.$lng - $xy.$lng);
	$coor.$lat +=($cr.$lat - $xy.$lat);

	var $xy = clone($coor);
	w2g($xy);
	$coor.$lng +=($cr.$lng - $xy.$lng);
	$coor.$lat +=($cr.$lat - $xy.$lat);
}
function clone(obj){
	// Handle the 3 simple types, and null or undefined
	if(null == obj || "object" != typeof obj)
		return obj;
	// Handle Date
	if(obj instanceof Date){
		var copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}
	// Handle Array
	if(obj instanceof Array){
		var copy = [];
		for(var i = 0; i < obj.length; ++i){
			copy[i] = clone(obj[i]);
		}
		return copy;
	}
	// Handle Object
	if(obj instanceof Object){
		var copy ={};
		for(var attr in obj){
			if(obj.hasOwnProperty(attr))
				copy[attr] = clone(obj[attr]);
		}
		return copy;
	}
	throw new Error("Unable to copy obj! Its type isn't supported.");
}

export default {
	outOfChina,
	tLng,
	tLat,
	g2b,
	w2b,
	b2g,
	b2w,
	w2g,
	g2w,
	clone
}