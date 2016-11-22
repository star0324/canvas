$(function(){
    $(".first").mouseover(function(){
        $(this).children(".two").show();
    }).mouseout(function(){
        $(this).children(".two").hide();
    })
});

$(function(){
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var shade=document.querySelector(".shade");
    var eraser=document.querySelector(".eraser");
    var selects=document.querySelector(".selects");
    var obj=new shape(cobj,canvas,shade,eraser,selects);
    //先调用默认的，当点击后再执行后边
    obj.draw();
    //颜色的变化
    $(".colors").change(function(){
        obj.color=this.value;
    });
    //线条粗细的变化
    $(".widths").change(function(){
        obj.lineWidth=this.value;
    });
    //多边形和多角星个数的变化
    $(".num").change(function(){
        obj.angleNum=this.value;
        obj.bianNum=this.value;
    });
    //填充还是描边
    $(".styles>div").click(function(){
        obj.style=$(this).attr("role");
    });

    $(".sizes>div").click(function(){
        obj.eraserWidth=$(this).attr("widths");
    })
    //画图等对应的操作
    $("li").click(function(){
        var role=$(this).attr('role');
        console.log(role);
        eraser.style.display="none";
        if(role==undefined){
            return;
        }
        if(role=="pencil"){
            obj.pencil();
            return;
        }else if(role=="news"){
            obj.news();
            return;
        }else if(role=="save"){
            obj.save();
            return;
        }else if(role=="cancel"){
            obj.cancel();
            return;
        }else if(role=="choose"){
            obj.choose();
            return;
        }else if(role=="xp"){
            obj.xp();
            return;
        }else{
                obj.type=role
        }
        obj.draw();
    })
});

