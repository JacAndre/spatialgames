<template>
  <apexchart
    type="line"
    height="350"
    width="100%"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  setup() {
    return {};
  },
  props: ["data"],
  data() {
    return {
      series: this.data.data.series,
      title: this.data.data.xaxis[0].title[0].text,
      options: {
        chart: { id: this.title },
        title: {
          text: "(" + this.data.title + ") " + this.data.data.title[0].text
        },
        xaxis: {
          categories: this.data.data.xaxis.categories,
          title: { text: this.data.data.xaxis[0].title[0].text }
        },
        yaxis: {
          title: { text: this.data.data.yaxis[0].title[0].text }
        }
      }
    };
  }
};
</script>:
