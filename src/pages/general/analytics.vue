<template>
    <div class="row">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <SingleChart  query-name="users" title="Number of Ethereum blockchain users" column="0"  />
        </div>

    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="numberr" title="weekly transaction fees (US dollars $)" label="" :axis="{x:'date', y:'fees' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="numberr" title="Weekly transaction number" label="" :axis="{x:'date', y:'number' }" />
         </div>

         <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded"  query-name="numberr" title="Weekly active user" label="" :axis="{x:'date', y:'daily_active_user' }" />
         </div>
         
        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="price" title="price $" :point-radius="0" :axis="{x:'date', y:'price' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="number" title="Cumulative transactions number" :point-radius="0" :axis="{x:'date', y:'cumulative_transactions' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="number" title="success_rater" :point-radius="0" :axis="{x:'date', y:'success_rate' }" />
        </div>

    
        
      
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components : {
        BarChart: () => import("@/components/charts/bar.vue"),
        // DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        // MixedChart: () => import("@/components/charts/mixed.vue"),
        SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>