<html>

<head>
    <title>Hemmings - Research Dashboard</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/keen-dashboards.css"/>
    <link rel="stylesheet" type="text/css" href="css/chosen.min.css"/>
    <link rel="stylesheet" type="text/css" href="modules/slider/css/slider.css">
<style>
    #overlay {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: #000;
        opacity: 0.8;
        filter: alpha(opacity=80);
    }
    #loading {
        width: 50px;
        height: 57px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -28px 0 0 -25px;
    }
</style>

</head>

<body class="application">

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span
                        class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <a class="navbar-brand" href="">Hemmings - Research Dashboard</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-left">
                <li><a href="https://github.com/zackinaustin/Capstone">Source</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <form class="form-inline">
                <div class="form-group">
                    <label>Make</label>
                    <select id='make' data-placeholder="Choose a Make" class="chosen-select"
                            multiple>@foreach($makes as $make)
                            <option>{{{$make->make}}}</option>@endforeach</select>
                    <label>Model</label>
                    <select data-placeholder="If no model chosen,it will use all models" id='model' data-placeholder="Choose a Make" class="chosen-select"
                            multiple>@foreach($models as $model)
                            <option value="{{{$model->model}}}">{{{$model->model}}}</option>@endforeach</select>

                </div>
                <div class="checkbox">
                    <label>AdType:
                        <input type="checkbox" value="dealer" name="adType" checked> Dealer
                        <input type="checkbox" value="carsforsales" name="adType" checked> Car for Sales
                        <input type="checkbox" value="auction" name="adType" checked> Auction
                    </label>

                </div>
                <a id="update" class="btn btn-default btn-sm">Update</a>
            </form>
        </div>

        <div class="col-sm-8">
            <div class="chart-wrapper">
                <div class="chart-title">
                    Popularity
                </div>
                <div id='myChartContainer' class="chart-stage">
                    <canvas id="myChart" width="100%" height="100%" style="padding-right: 30px"></canvas>
                    <!--<div id="grid-1-1">-->
                    <!--<img data-src="holder.js/100%x240/white/text:#grid-1-1">-->
                    <!--</div>-->
                    <div id="legend"></div>
                </div>
                <div class="chart-notes">Notes about this chart</div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="chart-wrapper">
                <div class="chart-title">Average Price</div>
                <div id='price-ChartContainer' class="chart-stage">

                    <canvas id="price-Chart" width="100%" height="100%" style="padding-right: 30px"></canvas>
                    <!--<div id="grid-1-1">-->
                    <!--<img data-src="holder.js/100%x240/white/text:#grid-1-1">-->
                    <!--</div>-->
                    <div id="price-legend"></div>
                </div>
                <div class="chart-notes">Notes about this chart</div>
            </div>
        </div>
    </div>
    <div class="row">

        @include('2ndRow')
    </div>
    <hr>
    <p class="small text-muted">Built with &#9829; by <a href="https://keen.io">Keen IO</a>
    </p>
</div>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="css/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/holderjs/holder.js"></script>
<script>
    Holder.add_theme("white", {
        background: "#fff",
        foreground: "#a7a7a7",
        size: 10
    });
</script>

<script type="text/javascript" src="js/keen-js/dist/keen.min.js"></script>
<script type="text/javascript" src="js/meta.js"></script>
<script type="text/javascript" src="js/chosen.jquery.js"></script>
<script type="text/javascript" src="js/chroma.js"></script>
<script>
  function loading() {
        // add the overlay with loading image to the page
        var over = '<div id="overlay">' +
                '<img id="loading" src="img/loading4.gif">' +
                '</div>';
        $(over).appendTo('body');
    };
</script>
<script src="js/Chart.min.js"></script>
<script src="js/chartjsconfig.js"></script>
<script type="text/javascript" src="modules/slider/js/bootstrap-slider.js"></script>
<script type="text/javascript" src="js/data.pieChart.js"></script>
<script type="text/javascript" src="js/data.js"></script>

</body>

</html>