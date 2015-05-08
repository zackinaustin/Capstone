/**
 * Created by zhangzhang on 4/13/15.
 */

// Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
var price_ctx = $("#price-Chart").get(0).getContext("2d");

ctx.canvas.height = 300;
price_ctx.canvas.height = 300;


Chart.defaults.global.responsive = true;
// This will get the first returned node in the jQuery collection.
// var myNewChart = new Chart(ctx);
var data_for_main = {};
var data_for_price = {};
$(document).ready(function () {
    $('.chosen-select').chosen({width: "325px"});
    var default_model;
    var default_make;
    var dataset_labels = [];
    var dataset_num_id = [];
    var dataset_ave_counter = [];
    var dataset_ave_price = [];
    default_make = ['ford', 'chevrolet', 'international', 'jeep'];
    default_model = ['blazer', 'bronco', 'scout', 'wagoneer', 'grand wagoneer', 'bronco_ii'];
    $("#make").val(default_make);

    $('#make').trigger("chosen:updated");


    $.ajax({
        url: 'data/read',
        data: {
            make: default_make,
            model: default_model
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            data.forEach(function (value, index) {
                dataset_labels.push(value['year']);
                dataset_num_id.push(value['Num_id']);
                dataset_ave_counter.push(value['Avg_counter']);
                dataset_ave_price.push(parseFloat(value['Avg_price']).toFixed(2))

            })
        },
        complete: function () {
            data_for_main = {
                labels: dataset_labels,
                datasets: [{
                    label: "Num_id",
                    fillColor: "rgba(170, 169, 57,0.2)",
                    strokeColor: "rgba(170, 169, 57,1)",
                    pointColor: "rgba(170, 169, 57,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(170, 169, 57,1)",
                    data: dataset_num_id
                }, {
                    label: "Average Counter",
                    fillColor: "rgba(170, 121, 57,0.2)",
                    strokeColor: "rgba(170, 121, 57,1)",
                    pointColor: "rgba(170, 121, 57,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(63, 48, 117,1)",
                    data: dataset_ave_counter
                }]
            };
            data_for_price = {
                labels: dataset_labels,
                datasets: [{
                    label: "Avg_Price",
                    fillColor: "rgba(170, 169, 57,0.2)",
                    strokeColor: "rgba(170, 169, 57,1)",
                    pointColor: "rgba(170, 169, 57,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(170, 169, 57,1)",
                    data: dataset_ave_price
                }]
            };

            var myLineChart = new Chart(ctx).Line(data_for_main, {});
            var price_Chart = new Chart(price_ctx).Line(data_for_price, {});
            $("#legend").html(myLineChart.generateLegend());
            $("#price-legend").html(price_Chart.generateLegend());
        }
    });

    $('#update').on('click', function () {
        var new_dataset_labels = [];
        var new_dataset_num_id = [];
        var new_dataset_ave_counter = [];
        var new_dataset_ave_price = [];
        var makes = $('#make').val();
        var models = $('#model').val();
        var adType = [];
        $('input[name="adType"]:checked').map(function(){
            adType.push($(this).val());
        });
        console.log(adType);

        $.ajax({
            url: 'data/read',
            data: {
                make: makes,
                model: models,
                adType:adType
            },
            dataType: 'json',

            success: function (data) {
                console.log(data);
                data.forEach(function (value, index) {
                    new_dataset_labels.push(value['year']);
                    new_dataset_num_id.push(value['Num_id']);
                    new_dataset_ave_counter.push(value['Avg_counter']);
                    new_dataset_ave_price.push(parseFloat(value['Avg_price']).toFixed(2));
                })
            },
            complete: function () {
                data_for_main = {
                    labels: new_dataset_labels,
                    datasets: [{
                        label: "Num_id",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: new_dataset_num_id
                    }, {
                        label: "Average Counter",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: new_dataset_ave_counter
                    }]
                };
                data_for_price = {
                    labels: new_dataset_labels,
                    datasets: [{
                        label: "Avg_Price",
                        fillColor: "rgba(170, 169, 57,0.2)",
                        strokeColor: "rgba(170, 169, 57,1)",
                        pointColor: "rgba(170, 169, 57,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(170, 169, 57,1)",
                        data: new_dataset_ave_price
                    }]

                };
                $('#myChart').remove();
                $('#myChartContainer').prepend('<canvas id="myChart" width="100%" height="100%" style="padding-right: 30px"></canvas>');
                var ctx = $("#myChart").get(0).getContext("2d");
                var myLineChart = new Chart(ctx).Line(data_for_main, {});
                $("#legend").html(myLineChart.generateLegend());
                $('#price-Chart').remove();
                $('#price-ChartContainer').prepend('<canvas id="price-Chart" width="100%" height="100%" style="padding-right: 30px"></canvas>');
                var price_ctx = $("#price-Chart").get(0).getContext("2d");
                var price_Chart = new Chart(price_ctx).Line(data_for_price, {});
                $("#price-legend").html(price_Chart.generateLegend());
            }
        });
    });
    $('#make').on('change', function () {
        console.log("1");
        var makes = $('#make').val();
        //$('body').addClass('loadinggif');
        $.ajax({
            url: 'data/updateModelByMake',
            data: {
                make: makes
            },
            dataType: 'json',
            beforeSend:function(){
                loading();

            },
            success: function (data) {
                $('#model').empty();
                data.forEach(function (value) {
                    console.log(value);
                    $('#model').append($("<option></option>")
                        .attr('value', value.model)
                        .text(value.model));
                    $('#model').trigger("chosen:updated");
                });
            },
            complete: function () {
                //$('#model_chosen').removeClass('loadinggif');
                $('#overlay').remove();
            }
        });
    });
    pieChartInitialize();

});
