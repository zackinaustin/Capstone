function pieChartInitialize() {
    var slider = $('#slider').slider({
        min: 2009,
        max: 2014,
        step: 1,
        value: [2009, 2014],
        orientation: 'horizontal'

    });
    var pieChart_ctx = $("#pieChart").get(0).getContext("2d");
    pieChart_ctx.canvas.height = 400;
    var default_make=['ford','chevrolet','mercedes-benz','cadillac'];
    var default_year_range=[2009,2014];
    $("#pieMake").val(default_make);

    $('#pieMake').trigger("chosen:updated");
    updatePieChart(default_make,default_year_range);


    $("#pieUpdate").on('click', function () {
        var pie_make = $('#pieMake').val();
        if(pie_make==null){

            pie_make=['ford','chevrolet','cadillac','mercedes_benz',"pontiac"];
        }
        var year_range = $('#slider').slider('getValue');
        updatePieChart(pie_make,year_range);

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
            pieChart_ctx.canvas.height = 400;
            var pie_chart=new Chart(pieChart_ctx).Pie(pie_dataset);

        }
    });
}