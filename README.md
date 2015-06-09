# camera3D
jquery plugin，used to simulate the object animate under the camera movment.

设定好受摄像机影响的元素的位置，只需移动摄像机，就可以让元素模拟实际中摄像机运动情况。支持Z轴运动。 

#demo地址:
http://www.jq22.com/plugin/2147/demo

#插件用法如下：

$("#wrap").camera3D(obejectArray,
 
{
 
    mode: "once",
    //相机的运动模式
    x_position: x_position_fin,
    //相机初始位置（有效）
    y_position: y_position_fin,
    //相机初始位置（有效）
    z_position: z_position_fin,
    //相机初始位置（非有效）
    x_path: x_path_fin,
    //相机运动的X分量
    y_path: y_path_fin,
    //相机运动的Y分量
    z_path: z_path_fin,
    //相机运动的Z分量（有效，但只完全支持static和once模式）
    time: time_input //相机运动的时间
}
 
,
callback
});

说明：

1.wrap是包裹层，css设定的height和width是摄像机视界宽高，wrap属性z_width是视界纵深，也是摄像机默认Z轴位置。

2.插件第一个参数objectArray是受摄像机影响元素对象的数组。

html代码：
<div id="wrap" z_width="800px">
  <p id="a">Fifty Shades of Grey.</p>
  <p id="b">I Konw You</p>
  ...
</div>

数组参数如下：
var obejectArray=[
{
  obj:"#a",//obj对应该元素id值
  x_position:"720px",//该元素距父元素左侧700px
  y_position:"200px",//该元素距父元素上侧300px
  z_position:"680px" //该元素距父元素底层500px
},{
  obj:"#b",
  x_position:"500px",
  y_position:"100px",
  z_position:"100px"
}
...]


3.插件第二个参数是摄像机对象。

mode属性是摄像机运动模式：

static下元素按照参数数组中位置数值重定位，该模式一般用于摄像机初始位置调试。

once下摄像机按照路径运动一次。

return下摄像机运动完成后会原路返回。

repeat是重复的once运动。

cycle是重复的return运动。

-------------------------------------

x_position,y_position,z_position是摄像机初始所在位置，摄像机默认位置位于wrap视界中心，z_width纵深处。此处只支持x,y位置，z_position无效。

-------------------------------------

x_path,y_path,z_path是摄像机运动路径，只有摄像机有运动，元素才会运动。

注意，当z_path有数值时，return，repeat，cycle模式有偏差，慎用。

------------------------------------

time是摄像机运动的持续时间。
