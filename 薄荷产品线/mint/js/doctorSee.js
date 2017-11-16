$(function(){
    var idSee = sessionStorage.getItem('idSee')
    var TMonth = ((new Date()).getMonth()+1) <10? '0'+((new Date()).getMonth()+1) : ((new Date()).getMonth()+1) ;
    var Tdate = (new Date()).getDate()<10 ? '0'+(new Date()).getDate() : (new Date()).getDate() ;
    var TodayD = (new Date()).getFullYear()+'-'+TMonth;
    var TodayDate = (new Date()).getFullYear()+'-'+TMonth+'-'+Tdate;

    getDayVisitFun(TodayDate,idSee)

    AjaxObj.DoctorgetOne(function(result){
        if(result.Data.code == 1){
            var birth = result.Data.data.birthyear == null || result.Data.data.birthmonth == null ||  result.Data.data.birthday == null || result.Data.data.birthyear == 0 || result.Data.data.birthmonth == 0 ||  result.Data.data.birthday == 0  ? '' : result.Data.data.birthyear+'-'+result.Data.data.birthmonth+'-'+result.Data.data.birthday;
            $('#name').html(result.Data.data.name);
            if(result.Data.data.sex == 1 ){
                $('#sex').html('男');
            }else{
                $('#sex').html('女');
            }
            if(result.Data.data.is_show == 1 ){
                $('#is_show').html('是');
            }else{
                $('#is_show').html('否');
            }
            $('#J-xl').html(birth);
            $('#age').html(ages(birth));
            $('#position').html(result.Data.data.position);
            $('#hospital').html(result.Data.data.hospital);
            $('#field').html(result.Data.data.field);
            $('#job_age').html(result.Data.data.job_age);
            $('#context').html(result.Data.data.context);
            $('#phone').html(result.Data.data.phone);
            $('#account').html(result.Data.data.account);
            $('#assistant').html(result.Data.data.assistant);
            $('#meiqia').html(result.Data.data.meiqia);
            if(result.Data.data.tow_code == '' || result.Data.data.tow_code == null){
                $('#tow_codebox div').hide();
            }else{ 
               $('#tow_codeImg').html('<img src="'+result.Data.data.tow_code+'" alt="" />')
               var link =location.host+result.Data.data.tow_code;
               zclipFun(link)
            }
            //$('#label').html(result.Data.data.label);
            result.Data.data.photo == '' || result.Data.data.photo == null ? $('#logo img').attr('src','../../images/user_default.png'): $('#logo img').attr('src',result.Data.data.photo);
            var str = '';
            for(var m=0; m<result.Data.data.service_name_arr.length; m++){
                if(m==(result.Data.data.service_name_arr.length-1)){
                    str+=result.Data.data.service_name_arr[m];
                }else{
                    str+=result.Data.data.service_name_arr[m]+'，'
                }
            }
            $('#service_name_arr').html(str);
            var lab = '';
            for(var m=0; m<result.Data.data.label_arr.length; m++){
                if(m==(result.Data.data.label_arr.length-1)){
                    lab+=result.Data.data.label_arr[m];
                }else{
                    lab+=result.Data.data.label_arr[m]+'，'
                }
            }
            $('#label').html(lab);

        }else{
            alert(result.Data.msg)
        }
    },idSee)
    /*查询诊所地址列表*/
    AjaxObj.DoctorclinicLst(function(result){
        if(result.Data.code ==1){
            var html='';
            for(i=0; i<result.Data.data.length; i++){
                html+='<option value="'+result.Data.data[i].id+'">'+result.Data.data[i].clinic_name+'</option>'
            }
            $('#clinicList').html('<option value=""></option>'+html)
            AjaxObj.visitDateQuery(function(model){
                if(model.Data.code == 1){
                    if(model.Data.data ==''){
                        var valueDate = new Array();
                        $("#inline-calendar").calendar('setValue',valueDate);
                        var rowslength = $('.picker-calendar-month .picker-calendar-row').length;
                        var disable = valueDate;
                        for(var i =0;i<rowslength;i++){
                            var daylength = $('.picker-calendar-month .picker-calendar-row').eq(i).children().length;
                            for(var j=0;j<daylength;j++){
                                $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).addClass('picker-calendar-day picker-calendar-day-disabled');
                                for(var z =0 ; z<disable.length;z++){
                                    if($('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date') == disable[z]){
                                        $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date',disable[z]).removeClass('picker-calendar-day-disabled');
                                    }
                                }
                            }
                        }
                    }else if(model.Data.data =='' && model.Data.is_befor == 1){
                        $('#confirmbtnbox').show();
                        $('#clinic').attr('disabled',false)
                    }else{
                        $('#confirmbtnbox').hide();
                        $('#clinic').attr('disabled',true)
                        $('#clinicList option[value="'+model.Data.data[0].clinic_id+'"]').attr('selected',true);
                        var valueDate = new Array();
                        var valueDate2 = new Array();
                        for(var n=0; n<model.Data.data.length; n++){
                            var visit_dateVal = model.Data.data[n].visit_date;
                            if(model.Data.data[n].type ==2){
                                valueDate2.push(visit_dateVal);
                            }else{
                                valueDate.push(visit_dateVal);
                            }
                        }
                        console.log('valueDate',valueDate)
                        $("#inline-calendar").calendar('setValue',valueDate);
                        var rowslength = $('.picker-calendar-month .picker-calendar-row').length;
                        var disable = valueDate;
                        var disable2 = valueDate2
                        for(var i =0;i<rowslength;i++){
                            var daylength = $('.picker-calendar-month .picker-calendar-row').eq(i).children().length;
                            for(var j=0;j<daylength;j++){
                                $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).addClass('picker-calendar-day picker-calendar-day-disabled');
                                
                                for(var z =0 ; z<disable.length;z++){
                                    if($('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date') == disable[z]){
                                        $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date',disable[z]).removeClass('picker-calendar-day-disabled');
                                    }
                                }
                                for(var z =0 ; z<disable2.length;z++){
                                    if($('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date') == disable2[z]){
                                        $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date',disable2[z]).removeClass('picker-calendar-day-disabled');
                                        $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date',disable2[z]).addClass('picker-calendar-day-selected2');
                                    }
                                }
                            }
                        }
                        /*for(var n=0; n<model.Data.data.length; n++){
                            var visit_dateVal = model.Data.data[n].visit_date;
                                valueDate.push(visit_dateVal)
                        }
                        //console.log('valueDate',valueDate)
                        $("#inline-calendar").calendar('setValue',valueDate);*/
                    }
                }else{
                    opCityTip(model.Data.msg)
                }
            },TodayD,idSee)
        }
    })
    timeDatapre(1);
    var dataArray = new Array();
    $("#inline-calendar").calendar({
        container: "#inline-calendar",
        input: "#date",
        minDate:'',
        maxDate:sessionStorage.getItem('nex_date'),
        multiple:true,
        value:'',
        onChange:function(p, values, displayValues){

        },
        onMonthYearChangeEnd:function(p,year,month){
            if((parseInt(month)+1)<10){
                var thisMonth = year+'-0'+(parseInt(month)+1);
            }else{
                var thisMonth = year+'-'+(parseInt(month)+1);
            }
            AjaxObj.visitDateQuery(function(model){
                if(model.Data.code == 1){
                    if(model.Data.data ==''){

                    }else if(model.Data.data =='' && model.Data.is_befor == 1){
                        $('#confirmbtnbox').show();
                        $('#clinic').attr('disabled',false)
                    }else{
                        $('#confirmbtnbox').hide();
                        $('#clinic').attr('disabled',true)
                        $('#clinicList option[value="'+model.Data.data[0].clinic_id+'"]').attr('selected',true);
                        var valueDate = new Array();
                        var valueDate2 = new Array();
                        for(var n=0; n<model.Data.data.length; n++){
                            var visit_dateVal = model.Data.data[n].visit_date;
                            if(model.Data.data[n].type ==2){
                                valueDate2.push(visit_dateVal);
                            }else{
                                valueDate.push(visit_dateVal);
                            }
                        }
                        console.log('valueDate',valueDate)
                        $("#inline-calendar").calendar('setValue',valueDate);
<<<<<<< .mine
                        // $("#inline-calendar").calendar('setValue',['2016-09-14']);

=======
                        var rowslength = $('.picker-calendar-month .picker-calendar-row').length;
                        var disable = valueDate;
                        var disable2 = valueDate2;
                        for(var i =0;i<rowslength;i++){
                            var daylength = $('.picker-calendar-month .picker-calendar-row').eq(i).children().length;
                            for(var j=0;j<daylength;j++){
                                $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).addClass('picker-calendar-day picker-calendar-day-disabled');
                                for(var z =0 ; z<disable.length;z++){
                                    if($('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date') == disable[z]){
                                        $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date',disable[z]).removeClass('picker-calendar-day-disabled');
                                    }
                                }
                                for(var z =0 ; z<disable2.length;z++){
                                    if($('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date') == disable2[z]){
                                        $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date',disable2[z]).removeClass('picker-calendar-day-disabled');
                                        $('.picker-calendar-month .picker-calendar-row').eq(i).children().eq(j).attr('data_date',disable2[z]).addClass('picker-calendar-day-selected2');
                                    }
                                }
                            }
                        }
>>>>>>> .r14865
                    }
                }else{
                    opCityTip(model.Data.msg)
                }
            },thisMonth,idSee)

        },
        onDayClick:function(p, dayContainer, year, month, day){

          if((parseInt(month)+1)<10){
              var thisMonth = year+'-0'+(parseInt(month)+1);
          }else{
              var thisMonth = year+'-'+(parseInt(month)+1);
          }

          AjaxObj.visitDateQuery(function(model){
              if(model.Data.code == 1){
                  if(model.Data.data ==''){

                  }else if(model.Data.data =='' && model.Data.is_befor == 1){
                      $('#confirmbtnbox').show();
                      $('#clinic').attr('disabled',false)
                  }else{
                      $('#confirmbtnbox').hide();
                      $('#clinic').attr('disabled',true)
                      $('#clinicList option[value="'+model.Data.data[0].clinic_id+'"]').attr('selected',true);
                      var valueDate = new Array();
                      for(var n=0; n<model.Data.data.length; n++){
                          var visit_dateVal = model.Data.data[n].visit_date;
                              valueDate.push(visit_dateVal)
                      }
                     // console.log('valueDate',valueDate)
                      $("#inline-calendar").calendar('setValue',valueDate);
                      window.valueDate = valueDate;
                  }
              }else{
                  opCityTip(model.Data.msg)
              }
          },thisMonth,idSee)

            if(day<10){
              day = '0'+day;
            }else{
              day = day;
            }

            for(var i = 0;i<valueDate.length;i++){
              if(valueDate[i] == thisMonth+'-'+day){
                console.log(1111);
              }else{
                return false;
              }
            }

            p.wrapper.find('.picker-calendar-day-selected').toggleClass('picker-calendar-day-selected');
            p.wrapper.find('.picker-calendar-day').toggleClass('picker-calendar-day-selected');
            /*获取具体时间*/
            var Monthdate = (parseInt(month)+1) < 10 ? "0" + (parseInt(month)+1): (parseInt(month)+1);
            var Datdate = day < 10 ? "0" + day : day;
            var visit_date = year + "-" + Monthdate + "-" + Datdate;
            getDayVisitFun(visit_date,idSee)
            var thisMonth = year + "" + Monthdate;
            var Month = (new Date()).getMonth();
            if( (Month+1) >= 12 ){
                var nextMonth = (parseInt(year)+1)+'01';
            }else{
                if( (Month+2) <10 ){
                    var nextMonth = year+'0'+(Month+2);
                }else{
                    var nextMonth = year+''+(Month+2);
                }
            }
            //console.log(thisMonth,nextMonth)
                $('#chuTime').html(year+'年'+(parseInt(month)+1)+'月'+day+'日')
                var start_time ='09:00',
                    end_time =  '17:30';
                if( !dayContainer.hasClass('picker-calendar-day-selected') ){//添加日
                    timeDatapre(1)
                    var obj={
                        visit_date:visit_date,
                        start_time:start_time,
                        end_time:end_time
                    }
                    $('#start_time').change(function(){
                        //console.log($(this).val())
                        start_time = $(this).val();
                        if( start_time.replace(":", "") >= end_time.replace(":", "") ){
                            opCityTip('初始时间不能大于结束时间')
                            $('#start_time option[value="09:00"]').attr('selected',true)
                        }else{
                            obj.end_time=end_time
                        }
                        obj.start_time=start_time
                    })
                    $('#end_time').change(function(){
                        //console.log($(this).val())
                        end_time = $(this).val();
                        if( start_time.replace(":", "") >= end_time.replace(":", "") ){
                            opCityTip('初始时间不能大于结束时间')
                            $('#end_time option[value="17:30"]').attr('selected',true)
                        }else{
                            obj.end_time=end_time
                        }

                    })
                    dataArray.push(obj)

                }else{//取消日
                    timeDatapre(2)
                    //console.log(dataArray)
                    for(i=0; i<dataArray.length; i++){
                        if(visit_date == dataArray[i].visit_date){
                            dataArray.splice(i,1)
                            console.log(dataArray)
                        }
                    }
                }
                //console.log(dayContainer.attr('data-date'))

                $('#confirm-but').on('click',function(){
                    $('#timeTipbox').hide();
                })



            /*点击查询到的天*/
            if( !dayContainer.hasClass('picker-calendar-day-selected') ){
               // console.log('a')
            }else{
               // console.log(visit_date)
                visitDateQueryFun(visit_date,idSee)//点击某一天查看医生的初诊信息
            }

        }
    });
    $('#edit-but').click(function(){
        location.href="/mint/html/doctorlist/edit.html#Doctor";
        sessionStorage.setItem('user_id',idSee)
    })
    $('.timesethover').click(function(){
        $('#timeTipbox').show();
    })

    $('.close-dialog').click(function(){
        $('#timeTipbox').hide();
    })

})
function zclipFun(copyLink){
    $("#copyLink").zclip({
        path: '../../diyUpload/js/ZeroClipboard.swf',
        copy: copyLink,
        afterCopy: function(){
          $('.opacity-tip p').html('复制成功')
          $('.opacity-tip').fadeIn().delay(1000).fadeOut(2000)
        }
  });
}
function  ages(str){
    var  r  =  str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(r==null) return  '';
    var  d=  new  Date(r[1],  r[3]-1,  r[4]);
    if  (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){
        var  Y  =  new  Date().getFullYear();
        return( Y-r[1] );
    }
    return("输入的日期格式错误！");
}
function visitDateQueryFun(TodayD,idSee){//点击某一天查看医生的初诊信息
    AjaxObj.visitDateQuery(function(model){
        if(model.Data.code == 1){
            timeDatapre('1')
            if(model.Data.data !=''){
                $('#start_time option[value="'+model.Data.data[0].start_time+'"]').attr('selected',true);
                $('#end_time option[value="'+model.Data.data[0].end_time+'"]').attr('selected',true);
                $('#clinicList option[value="'+model.Data.data[0].clinic_id+'"]').attr('selected',true);
            }
        }else{
            opCityTip(model.Data.msg)
        }
    },TodayD,idSee)
}
function getDayVisitFun(TodayD,idSee){
    AjaxObj.getDayVisit(function(result){
        if(result.Data.code ==1){
            var html='';
            if(result.Data.data == ''){
                $('.docto_desc_main ul').html('<li style="height:50px"><p><label>暂时没有相关数据</label></p></li>')
            }else{
                for (var i = 0; i<result.Data.data.length; i++) {
                    var sex = result.Data.data[i].sex == 1? '男':'女';
                    html+='<li>'
                    html+='<p><b>'+result.Data.data[i].patient_name+'</b><span>'+result.Data.data[i].age+'岁</span><span>'+sex+'</span></p>'
                    html+='<p>项目：<span>'+result.Data.data[i].project_name+'</span></p>'
                    html+='<p>就诊时间：<span>'+result.Data.data[i].visit_time+'</span></p>'
                    html+='<p>联系方式：<span>'+result.Data.data[i].contact_tel+'</span></p>'
                    html+='</li>'
                }
                $('.docto_desc_main ul').html(html)
            }
        }else{
           opCityTip(result.Data.msg)
        }
    },TodayD,idSee)
}
function timeDatapre(show){
    var h =8,m=0,html='';
    for(var i=0 ; i<13; i++){
        h+=1;
        m=0;
        for(var a=0; a<4; a++){
            if( m==60 ){
                m=0;
            }
            var hour = h <10? '0'+h : h;
            var minute= m == 0?'00':m;
            if( !(h==21 && (m==15 || m==30 || m==45)) ){
                //if( !(h==12 || h==18) ){
                    html+='<option value="'+hour+':'+minute+'">'+hour+':'+minute+'</option>'
                //}
                m+=15;
            }
            
        }   
    }
    var optionHtml = html;
    var str = '<div class="timeDatapre" style="border-top:none;">\
            <h3>\
                <span>初诊：</span>\
                <p>\
                    <select name="" id="start_time" disabled>'+optionHtml+'</select>\
                </p>\
            </h3>\
            <h3>\
                <span>终诊：</span>\
                <p>\
                    <select name="" id="end_time" disabled>'+optionHtml+'</select>\
                </p>\
            </h3>\
        </div>'
        if(show==1){
            $('.timechoose').html(str)
        }else{
            $('.timechoose').html('')
        }
}
function opCityTip(tiptext){
    $('.opacity-tip').fadeIn(500).delay(2000).fadeOut()
    $('.opacity-tip p').html(tiptext).css({'margin-left':-($('.opacity-tip p').width()/2)})
}
