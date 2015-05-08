function pieChartInitialize() {
    var slider = $('#slider').slider({
        min: 2009,
        max: 2014,
        step: 1,
        value: [2009, 2014],
        orientation: 'horizontal'

    });
    var pieChart_ctx = $("#pieChart").get(0).getContext("2d");
    pieChart_ctx.canvas.height = 300;
    var radarChart_ctx=$('#radarChart').get(0).getContext("2d");
    radarChart_ctx.canvas.height = 300;
    var default_make=['ford','chevrolet'];
    var default_year_range=[2009,2014];
    $("#pieMake").val(default_make);
    $('#pieMake').trigger("chosen:updated");
    updatePieChart(default_make,default_year_range);
    updateRadarChar(default_make,default_year_range);


    $("#pieUpdate").on('click', function () {

        var pie_make = $('#pieMake').val();
        if(pie_make.length>5){
            alert("For Best View, Please limit makes to 5")
        }else{
            if(pie_make==null){

                pie_make=['ford','chevrolet','cadillac','mercedes_benz',"pontiac"];
            }
            var year_range = $('#slider').slider('getValue');
            updatePieChart(pie_make,year_range);
            updateRadarChar(pie_make,year_range);

        }

    })

}

function updatePieChart(make,yearRange){
    var color=['#E3F218','#555924','#BF9C00','#98A5C7','#188BF2'];
    var pie_dataset=[];
    $.ajax({
        url: 'data/marketShare',
        data: {make: make, yearRange: yearRange},
        dataType: 'json',
        success:function(data){

            data.forEach(function(value,index){
                pie_dataset.push({
                    value: value.count,
                    color:color[index],
                    highlight: chroma(color[index]).brighten().hex(),
                    label: value.make
                });
            });
        },
        complete:function(){
            $('#pieChart').remove();
            $('#pieChartContainer').prepend('<canvas id="pieChart" width="100%" height="100%" style="padding-right: 30px"></canvas>');
            var pieChart_ctx = $("#pieChart").get(0).getContext("2d");
            pieChart_ctx.canvas.height = 300;
            var pie_chart=new Chart(pieChart_ctx).Pie(pie_dataset);

        }
    });
}
/**
 * Created by zhangzhang on 5/4/15.
 */

function updateRadarChar(make,yearRange){
    var color=['rgba(227,242,24,0.2)','rgba(85,89,36,0.2)','rgba(191,156,0,0.2)','rgba(152,165,199,0.2)','rgba(24,139,242,0.2)'];
    var strokeColor=['rgba(227,242,24,1)','rgba(85,89,36,1)','rgba(191,156,0,1)','rgba(152,165,199,1)','rgba(24,139,242,1)'];
    var radar_dataset=[];
    var biggest={avg_counter:0,avg_price:0,numbers:0,avg_contacted:0}
    $.ajax({
        url:'data/makeComparison',
        data:{make:make,yearRange:yearRange},
        dataType:'json',
        success:function(data){
            resetTable();
            data.forEach(function(value,index){
                if(parseFloat(value.avg_counter)>biggest.avg_counter){biggest.avg_counter=value.avg_counter;console.log(biggest.avg_counter);}
                if(value.avg_price>biggest.avg_price){biggest.avg_price=value.avg_price;}
                if(value.numbers>biggest.numbers){biggest.numbers=value.numbers;}
                if(value.avg_contacted>biggest.avg_contacted){biggest.avg_contacted=value.avg_contacted;}

            });

            data.forEach(function(value,index){

                radar_dataset.push({
                    fillColor: color[index],
                    strokeColor: strokeColor[index],
                    pointColor: strokeColor[index],
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: strokeColor[index],
                    label:value.make,
                    data:[parseFloat(value.avg_counter/biggest.avg_counter).toFixed(2),parseFloat(value.avg_price/biggest.avg_price).toFixed(2),parseFloat(value.numbers/biggest.numbers).toFixed(2),parseFloat(value.avg_contacted/biggest.avg_contacted).toFixed(2)]
                });
                var row=$('<tr></tr>');

                row.append($('<th></th>').attr('scope','row').html(value.make));
                row.append($('<td></td>').html(value.avg_counter));
                row.append($('<td></td>').html(value.avg_price));
                row.append($('<td></td>').html(value.numbers));
                row.append($('<td></td>').html(value.avg_contacted));
                $('#tb').append(row);


              });

        },
        complete:function(){
            var data={
                labels:['Average Counters','Average Price','Number of record','Average Contact'],
                datasets:radar_dataset
            };
            console.log(radar_dataset);
            $("#radarChart").remove();
            $('#radarChartContainer').prepend('<canvas id="radarChart" width="100%" height="100%" style="padding-right: 30px"></canvas>');
            var radarChart_ctx=$("#radarChart").get(0).getContext("2d");
            radarChart_ctx.canvas.height = 300;
            var radar_chart=new Chart(radarChart_ctx).Radar(data);
            $("#radarLegend").html(radar_chart.generateLegend());
        }

    });
}

function resetTable(){
       $("#tb").empty();
}