function shape(cobj,canvas,shade,eraser,selects){
    this.canvas=canvas;
    this.cobj=cobj;
    this.shade=shade;
    this.eraser=eraser;
    this.selects=selects;
    this.width=canvas.width;
    this.height=canvas.height;
    //默认直线
    this.type="line";
   //默认填充
    this.style="fill";
    //默认黑色
    this.color="#000";
    //默认线条宽度为1
    this.lineWidth=1;
    //默认橡皮擦大小
    this.eraserWidth=30;
    //默认为五边形
    this.bianNum=5;
    //默认为五角星
    this.angleNum=5;
    //控制撤销
    this.falg=true;
    //控制选择器
    this.falg1=true;
    this.arr=[];
}
shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.strokeStyle=this.color;
        this.cobj.fillStyle=this.color;
        this.cobj.lineWidth=this.lineWidth;
    },
    draw:function(){
        var that=this;
        that.shade.onmousedown=function(e){
            var event=window.event || e;
            that.init();
            var startx= event.offsetX;
            var starty= event.offsetY;
            that.shade.onmousemove=function(e){
                var event=window.event || e;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.arr.length>0){
                    that.cobj.putImageData(that.arr[that.arr.length-1],0,0);
                }
                var movex= event.offsetX;
                var movey= event.offsetY;
                that.cobj.beginPath();
                that[that.type](startx,starty,movex,movey);
            }
            that.shade.onmouseup=function(){
                that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.shade.onmousemove=null;
                that.shade.onmouseup=null;
                this.falg=true;
            }
        }

    },
    //直线
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    //矩形
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    //圆形
    arc:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,Math.PI*2,false);
        this.cobj[this.style]();
    },
    //三角形
    triangle:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.lineTo(x,y);
        this.cobj.lineTo(x,y1);
        this.cobj.lineTo(x1,y1);
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    //多边形
    polygon:function(x,y,x1,y1){
        var angle=360/this.bianNum*Math.PI/180;
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(Math.cos(angle*i)*r+x,Math.sin(angle*i)*r+y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    //多角星
    stars:function(x,y,x1,y1){
        var r1=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r2=r1*0.35;
        var jnum=this.angleNum*2;
        var angle=360/this.angleNum/2*Math.PI/180;
        this.cobj.beginPath();
        for(var i=0;i<jnum;i++){
            if(i%2==0){
                this.cobj.lineTo(Math.cos(angle*i)*r1+x,Math.sin(angle*i)*r1+y)
            }else{
                this.cobj.lineTo(Math.cos(angle*i)*r2+x,Math.sin(angle*i)*r2+y)
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    //橡皮擦
    xp:function(){
        this.init();
        this.eraser.style.width = this.eraserWidth+"px";
        this.eraser.style.height = this.eraserWidth+"px";
        console.log(this.eraserWidth);
        var that = this;
        this.eraser.style.display = "block";
        var width = this.eraser.offsetWidth/2;
        var height = this.eraser.offsetHeight/2;
        this.shade.onmousedown = function(){
            this.onmousemove = function(e){
                var mx = e.offsetX;
                var my = e.offsetY;
                //清除
                that.cobj.clearRect(mx-width,my-height,width*2,height*2);

                var top = my-height;
                var left = mx-width;
                if(left>(that.canvas.width-width*2)){
                    left = that.canvas.width-width*2;
                }
                if(left<0){
                    left = 0;
                }
                if(top>(that.canvas.height-height*2)){
                    top = that.canvas.height-height*2;
                }
                if(top<0){
                    top = 0;
                }
                that.eraser.style.top=top+"px";
                that.eraser.style.left=left+"px";
                that.shade.style.cursor = "none";


                this.onmouseup = function(){
                    that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                    that.shade.onmousemove = null;
                    that.shade.onmouseup = null;
                    that.shade.style.cursor = "pointer";
                }
            }
        }
    },
    //铅笔
    pencil:function(){
        var that=this;
        this.shade.onmousedown=function(e){
            var event=window.event || e;
            that.init();
            var startx= event.offsetX;
            var starty= event.offsetY;
            that.cobj.beginPath();
            this.onmousemove=function(e){
                var event=window.event || e;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.arr.length>0){
                    that.cobj.putImageData(that.arr[that.arr.length-1],0,0);
                }
                var movex= event.offsetX;
                var movey= event.offsetY;
                that.cobj.lineTo(movex,movey);
                that.cobj.stroke();
            }
            this.onmouseup=function(){
                that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                this.onmousemove=null;
                this.onmouseup=null;
            }
        }
    },
    //撤销
    cancel:function(){
        if(this.arr.length>1){
            if(this.falg){
                this.falg=false;
                this.arr.pop();
                this.cobj.putImageData(this.arr[this.arr.length-1],0,0);
            }else{
                this.arr.pop();
                this.cobj.putImageData(this.arr[this.arr.length-1],0,0);
            }
        }else if(this.arr.length==1){
            this.cobj.putImageData(this.arr[this.arr.length-1],0,0);
            this.arr.pop();
            this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height);
        }else if(this.arr.length==0){
            alert("当前不能再撤销了！");
        }
    },
    //保存
    save:function(){
        if(this.arr.length>0){
            var data=this.canvas.toDataURL();
            data=data.replace("image/png","stream/octet");
            window.location.href=data;
        }
    },
    //新建
    news:function(){
        if(this.arr.length>0){
            var yes=confirm("是否保存");
            if(yes){
                this.save();
            }else{
                this.arr=[];
                this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height);
            }
        }
    },
    //选择
    choose:function(){
        this.init();
        var falg1 = this.falg1;
        var that = this;
        var width = 0,height=0;
        if(this.arr.length>0){
            this.shade.onmousedown = function(e){
                var event=window.event || e;
                var tops = event.offsetY;
                var lefts = event.offsetX;
                if(that.falg1){
                    this.onmousemove = function(e){
                        var eve=window.event || e;
                        that.selects.style.display = "block";
                        that.selects.style.top = tops+"px";
                        that.selects.style.left = lefts+"px";
                        width = eve.offsetX-lefts;
                        height = eve.offsetY-tops;
                        that.selects.style.width = width+"px";
                        that.selects.style.height = height+"px";
                    };
                    this.onmouseup = function(){
                        that.selectImg=that.cobj.getImageData(lefts,tops,width,height);
                        that.cobj.clearRect(lefts,tops,width,height);
                        that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                        that.cobj.putImageData(that.arr[that.arr.length-2],0,0);
                        this.onmousemove=null;
                        this.onmouseup = null;
                        that.falg1 = false;
                    };
                }else{
                    that.shade.onmousemove=function(e){
                        var ev=window.event || e;
                        var left1 = ev.offsetX-width/2;
                        var top1 = ev.offsetY-height/2;
                        that.cobj.clearRect(0,0,that.width,that.height);
                        that.cobj.putImageData(that.arr[that.arr.length-1],0,0);
                        if(left1>=that.width-width){
                            left1=that.width-width;
                        }
                        if(left1<0){
                            left1=0;
                        }
                        if(top1>that.height-height){
                            top1=that.height-height;
                        }
                        if(top1<0){
                            top1=0;
                        }
                        that.cobj.putImageData(that.selectImg,left1,top1);
                        that.selects.style.top = top1+"px";
                        that.selects.style.left = left1+"px";
                    };
                    that.shade.onmouseup=function(){
                        that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                        that.selectImg="";
                        that.shade.onmousemove=null;
                        that.shade.onmouseup=null;
                        that.falg1=true;
                        that.selects.style.display="none";
                        that.selects.style.width=0;
                        that.selects.style.heihgt=0;
                    }
                }
            };

        }

    },
}