<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-3">
        <SingleChart
          query-name="NFTmint"
          name="number"
          title="Total number of NFT mints"
          column="0"
        />
      </div>

      <div class="col-12 col-md-3">
        <SingleChart query-name="NFTmint" name="number" title="Number of projects" column="1" />
      </div>

      <div class="col-12 col-md-3">
        <SingleChart query-name="NFTmint" name="number" title="Number of minters" column="2" />
      </div>

      <div class="col-12 col-md-3">
        <SingleChart
          query-name="NFTmint"
          name="US dollar $"
          title="Total mint price $"
          column="3"
        />
      </div>

      <div class="col-12 col-md-4">
        <SingleChart
          query-name="NFTmint"
          name="US dollar $"
          title="Average mint price per NFT"
          column="4"
        />
      </div>

      <div class="col-12 col-md-4">
        <SingleChart
          query-name="NFTmint"
          name="average"
          title="Average mint number per minter"
          column="5"
        />
      </div>

      <div class="col-12 col-md-4">
        <SingleChart
          query-name="NFTmint"
          name="Average"
          title="Average Mint number per project"
          column="6"
        />
      </div>
    </div>

     <div class="col-12 col-md-12">
      <BarChart
        query-name="dailymint"
        title="Weekly NFT mint"
        class="border rounded"
        label="$"
        :axis="{ x: 'date', y: 'number' }"
      />
    </div>

    <div class="col-12 col-md-12">
      <LineChart
        query-name="daily_mint"
        title="Cumulative weekly NFT mint number"
        :point-radius="0"
        class="border rounded"
        :axis="{ x: 'date', y: 'cumulative_number' }"
      />
    </div>

    <div class="col-12 col-md-12">
      <BarChart
        dot-format-date
        query-name="projects"
        title="Top NFT prject with most NFT number"
        label=""
        class="border rounded"
        :axis="{ x: 'project_name', y: 'number' }"
      />
    </div>

   

    <div class="col-12 col-md-12">
      <DoughnutChart
        query-name="top"
        label="Top NFT prject with most NFT number"
        class="border rounded"
        :some-in-group="{ by: 'project_name', over: 'number' }"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    BarChart: () => import("@/components/charts/bar.vue"),
    DoughnutChart: () => import("@/components/charts/doughnut.vue"),
    LineChart: () => import("@/components/charts/line.vue"),
    // MixedChart: () => import("@/components/charts/mixed.vue"),
    SingleChart: () => import("@/components/charts/single.vue"),
  },
};
</script>
