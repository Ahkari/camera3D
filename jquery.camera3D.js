;(function($){
 // 这里写代码了啦
  $.fn.extend({
    "camera3D":function(objectArray,camera,callBack){
   // jQuery对象的方法扩展，所以用jQuery.fn.extend()来编写
   
   //来确认下camera的模式，没有默认为static
    var mode=!camera.mode?"static":camera.mode;
 
    if (true){
    // 咱们先把位置啥的算算，模式绑动画就行
    // 获取公式中的Xw，Yw和Zw
        var x_width=parseInt($(this).css("width"));
        var y_width=parseInt($(this).css("height"));
        var z_width=parseInt($(this).attr("z_width"));
    }
    // 获取相机位置，与X,Y,Z位置比较，后续所有元素初始位置都要经该位置差值处理。要求加上这个值。
    var cameraX_position=camera.x_position?parseInt(camera.x_position):x_width/2;
    var cameraY_position=camera.y_position?parseInt(camera.y_position):y_width/2;
    var cameraZ_position=camera.z_position?parseInt(camera.z_position):z_width;
    var cameraX_offset=cameraX_position-x_width/2;
    var cameraY_offset=cameraY_position-y_width/2;
    var cameraZ_offset=cameraZ_position-z_width;
   
      var lengthObj=objectArray.length;
      // console.log(lengthObj);


    if (objectArray!=undefined){
      // $(b.obj1).

      for (var i=0;i<lengthObj;i++){

        // 获取公式中的x1,y1,z1
        var x_offset_1=parseInt(objectArray[i].x_position);
        var y_offset_1=parseInt(objectArray[i].y_position);
        var z_offset_1=parseInt(objectArray[i].z_position);
   
        //加上摄像机X,Y轴偏移值，做出摄像机位置影响的假象。
        var x_offset_1=x_offset_1-cameraX_offset;
        var y_offset_1=y_offset_1-cameraY_offset;
        

    //也许我们必须获取元素的中心位置才行，哎
    //2/16日，觉得只使用高度取中心位置，宽以后再考虑，应为宽度自适应很讨厌。块状元素和行内元素也就高度好搞定。
    //最终还是未采用
    var x_width00=parseInt($(objectArray[i].obj).width());
    var y_width00=parseInt($(objectArray[i].obj).height());
    // console.log(y_width00);
    //覆盖掉我们的y1值
    // var y_offset_1=y_offset_1+y_width00;


    // 计算出摄像机存在下的实际显示的水平X值。
    function countXvalue(x1,z1,Xw,Zw){
      var v1=2*x1*Zw-Xw*z1;
      var v2=2*Zw-2*z1;
      var value=v1/v2;
      return value;
    }
    //计算出摄像机存在下的实际显示的垂直y值,（其实不需要）
    function countYvalue(y1,z1,Yw,Zw){
      var v1=2*y1*Zw-Yw*z1;
      var v2=2*Zw-2*z1;
      var value=v1/v2;
      return value;
    }
    // 计算摄像机Z轴运动后的实际X值.这和上面两个式子不太一样。上面值通用于运动前和运动后，而本式子是纯粹为了计算Z轴运动后的X值。
    // function countXwithZpath(x1,Xw,Zw,Zm){
    //   var v1=x1*Zw-Xw*Zm;
    //   var v2=Zw-Zm;
    //   var value=v1/v2;
    //   return value;
    // }
    //同理，因Z变化导致的Y位置变化（其实不需要）
    // function countYwithZpath(y1,Yw,Zw,Zm){
    //   var v1=y1*Zw-Yw*Zm;
    //   var v2=Zw-Zm;
    //   var value=v1/v2;
    //   return value;
    // }
    //计算因Z变化导致的元素大小变化，末大小/原大小为变化系数
    function countScaleWithZpath(Zw,Zm){
      var v2=Zw+Zm;
      var value=Zw/v2;
      return value;
    }
    //计算偏移值xOffsetWithZ,在原X值上直接加。
    function countXoffsetWithZ(x1,Xw,Zw,Zm){
      var v1=Zm*Xw-2*Zm*x1;
      var v2=2*Zm+2*Zw;
      var value=v1/v2;
      return value;
    }
    //因Z运动引起的Y值变化。在原Y值上直接加。
    function countYoffsetWithZ(y1,Yw,Zw,Zm){
      var v1=Zm*Yw-2*Zm*y1;
      var v2=2*Zm+2*Zw;
      var value=v1/v2;
      return value;
    }




    var x_before=countXvalue(x_offset_1,z_offset_1,x_width,z_width);
    var y_before=countYvalue(y_offset_1,z_offset_1,y_width,z_width);

    // 将计算后的值赋给指定id的对象
    $(objectArray[i].obj).css("position","absolute");
    $(objectArray[i].obj).css("left",x_before);
    $(objectArray[i].obj).css("top",y_before);

    // 读取相机行进路径值
    var x_move=parseInt(camera.x_path);
    var y_move=parseInt(camera.y_path);

    var timeCamera=parseInt(camera.time);
   
    //位移后的X1和Y1值
    var x_offset_1_after=x_offset_1-x_move;
    var y_offset_1_after=y_offset_1-y_move;

    // console.log("y="+y_move);
    // console.log("x="+x_move);

    // 计算相机运动终止后的实际显示的水平x值
    var x_after=countXvalue(x_offset_1_after,z_offset_1,x_width,z_width);
    var y_after=countXvalue(y_offset_1_after,z_offset_1,y_width,z_width);
   
    //获取Z轴运动值
    var z_move=parseInt(camera.z_path);
    //计算因Z轴运动引起的X，Y的偏移值
    var x_offset_with_z=countXoffsetWithZ(x_offset_1,x_width,z_width,z_move);
    var y_offset_with_z=countYoffsetWithZ(y_offset_1,y_width,z_width,z_move);
    // console.log(x_offset_with_z);
    //将Z运动引起的X,Y偏移加到XY运动后的XY值上。获得最终的Xfin和Yfin
    var x_after=x_after+x_offset_with_z;
    var y_after=y_after+y_offset_with_z;
    // console.log(x_after);

    //我们失望的发现拿元素左上角作为位置计算点的话，scale也必须以左上角的点作为变形原点。变形原点在绑定时设置。此处获取变形系数。
    var scaleValue=countScaleWithZpath(z_width,z_move);
    var scaleValue2=1/scaleValue;
    // console.log(scaleValue2);



    //模式选择
    switch(mode){
      //静止模式，只计算出初始摄像机的位置
      case "static":
        $(objectArray[i].obj).css("position","absolute");
        $(objectArray[i].obj).css("left",x_before);
        $(objectArray[i].obj).css("top",y_before);
        break;  


      // 一次模式，相机只运行一次。A到B
      case "once":
      // 应用到动画上
        $(objectArray[i].obj).css("transform-origin","0% 0%");
        var timeCameThousand=timeCamera/1000+"s";
        $(objectArray[i].obj).css("transition","transform "+timeCameThousand);
        $(objectArray[i].obj).css("transition-timing-function","ease-in-out");
         // $(objectArray[i].obj).css("transition","transform "+timeCameThousand);
        $(objectArray[i].obj).css("transform","scale("+scaleValue+")");
        $(objectArray[i].obj).animate({
          left:x_after+"px",
          top:y_after+"px"
        },timeCamera,callBack);
      break;  


      //一次返回模式，相机来回一次，A到B，B到A
      //同理，不能返回。
      case "return":
        $(objectArray[i].obj).css("transform-origin","0% 0%");
        var timeCameThousand=timeCamera/1000+"s";
        $(objectArray[i].obj).css("transition","transform "+timeCameThousand);
        $(objectArray[i].obj).css("transition-timing-function","ease-in-out");
        $(objectArray[i].obj).css("transform","scale("+scaleValue+")");
        if (i==(lengthObj-1)){
        $(objectArray[i].obj).animate({
          left:x_after+"px",
          top:y_after+"px"
        },timeCamera).animate({
          left:x_before+"px",
          top:y_before+"px"
        },timeCamera,callBack);}
        else{
           $(objectArray[i].obj).animate({
          left:x_after+"px",
          top:y_after+"px"
        },timeCamera).animate({
          left:x_before+"px",
          top:y_before+"px"
        },timeCamera);
        }
      break;


      //重复模式。A到B，A到B，A到B。。。。
      //同理，大小变化不能返回。
      case "repeat":

      function rep(num,x_before_num,y_before_num,x_after_num,y_after_num){
           // 大小变化的动画
        $(objectArray[num].obj).css("transform-origin","0% 0%");
        var timeCameThousand=timeCamera/1000+"s";
        $(objectArray[num].obj).css("transition","transform "+timeCameThousand);
        $(objectArray[num].obj).css("transition-timing-function","ease-in-out");
        $(objectArray[num].obj).css("transform","scale("+scaleValue+")");
        $(objectArray[num].obj)
          .animate({
            left:x_before_num+"px",
            top:y_before_num+"px"
          },0)
          .animate({
            left:x_after_num+"px",
            top:y_after_num+"px"
          },timeCamera)
         ;
        }
      // 注意闭包。这里需要解决闭包才能正常执行。  
      var animeRep=setInterval(
        function(num,x_before_num,y_before_num,x_after_num,y_after_num){
          if($(objectArray[num].obj).is(":animated")){
            return false;
           }else{
            return function(){
              rep(num,x_before_num,y_before_num,x_after_num,y_after_num);
              // console.log(num);
           };
         }
        }(i,x_before,y_before,x_after,y_after),"0");
      break;


      //循环模式。A到B，B到A，A到B，B到A。。。。
      //该模式下通过css动画做出的放大缩小效果不能回复。
      case "cycle":
      function rep(num,x_before_num,y_before_num,x_after_num,y_after_num){
        // 大小变化的动画
        $(objectArray[num].obj).css("transform-origin","0% 0%");
        // $(objectArray[num].obj).css("-moz-animation-direction","alternate");
        var timeCameThousand=timeCamera/1000+"s";
        $(objectArray[num].obj).css("transition","transform "+timeCameThousand);
        $(objectArray[num].obj).css("transition-timing-function","ease-in-out");
        $(objectArray[num].obj).css("transform","scale("+scaleValue+")");
   
        // setTimeout("$('#m').css('transform','scale(3)')",5000);
     
 



        $(objectArray[num].obj)
          .animate({
            left:x_after_num+"px",
            top:y_after_num+"px"
            // transform:scale(2)
          },timeCamera)
          .animate({
            left:x_before_num+"px",
            top:y_before_num+"px"
            // transform:scale(1)
          },timeCamera)
         ;

       

        }
      // 注意闭包。这里需要解决闭包才能正常执行。  
      var animeRep=setInterval(
        function(num,x_before_num,y_before_num,x_after_num,y_after_num){
          // $(objectArray[num].obj).css({'-moz-transform-origin':'0% 0%'});
          // $(objectArray[num].obj).css({'transform':'scale(5)'});  
          if($(objectArray[num].obj).is(":animated")){
            return false;
           }else{
            return function(){
              rep(num,x_before_num,y_before_num,x_after_num,y_after_num);                     
              // console.log(num);
           };
         }
        // $(objectArray[num].obj).
        }(i,x_before,y_before,x_after,y_after),"0");

      break;


      }//swith

      }//for循环括号

    }//在这个括号内完成循环，这是if语句的括号

 





  }//camera3D整个的括号


  });
})(jQuery);







