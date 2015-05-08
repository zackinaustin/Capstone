<div class="col-sm-12 col-md-12 col-lg-12">
    <form class="form-inline">
        <div class="form-group">
            <label>Make</label>
            <select id='pieMake' data-placeholder="Choose a Make" class="chosen-select"
                    multiple>@foreach($makes as $make)
                    <option>{{{$make->make}}}</option>@endforeach</select>




        </div>
        <div class="form-group">
            <label>Year Range</label>
            <div id="slider"></div>
        </div>
        <a id="pieUpdate" class="btn btn-default btn-sm">Update</a>
    </form>
</div>

<div class="col-sm-12 col-md-3">
    <div class="chart-wrapper">
        <div class="chart-title">
            Market Share
        </div>
        <div class="chart-stage">
            <div id='pieChartContainer' class="chart-stage">
                <canvas id="pieChart" width="100%" height="100%" style="padding-right: 30px"></canvas>
                <!--<div id="grid-1-1">-->
                <!--<img data-src="holder.js/100%x240/white/text:#grid-1-1">-->
                <!--</div>-->
                <div id="pieLegend"></div>
            </div>

        </div>
        <div class="chart-notes">Notes about this chart</div>
    </div>

</div>
<div class="col-sm-12 col-md-4">
    <div class="chart-wrapper">
        <div class="chart-title">Make Comparison</div>
        <div class="chart-stage">
            <div id="radarChartContainer">

            <canvas id="radarChart" width="100%" height="100%" style="padding-right: 30px"></canvas>
                <div id="radarLegend"></div>
            </div>
        </div>
        <div class="chart-notes">Notes about this chart</div>
    </div>
</div>
<div class="col-sm-12 col-md-5">
    <div class="chart-wrapper">
        <div class="chart-title">Detail</div>
        <div class="chart-stage">
            <table class="table" id="radarTable">

                <thead>
                <tr id="tr">
                    <th>#</th>
                    <th>Avg Counter</th>
                    <th>Avg Price</th>
                    <th>Num Record</th>
                    <th>Average Contact</th>

                </tr>
                </thead>
                <tbody id="tb">

                </tbody>
            </table>
        </div>
        <div class="chart-notes">Notes about this chart</div>
    </div>
</div>





