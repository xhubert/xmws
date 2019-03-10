/** this is for /inventory/overview */

<template>
  <v-container
    fluid
    fill-height
    class="inventory-content dash-container with-toolbar no-padding"
  >
    <v-layout column>
      <v-container v-if="isChecking" fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 text-xs-center>
            <v-progress-circular
              :size="22"
              :width="2"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
      <InventeryNoData
        v-else-if="data.length === 0 || !data"
        :on-load-data="onLoadInventoryData"
      />
      <InventeryDataList
        v-else
        :data="data"
        :cols="cols"
      />
    </v-layout>
  </v-container>
</template>

<script>
  import InventeryNoData from '~/components/inventory/index-no-data';
  import InventeryDataList from '~/components/inventory/data-list';

  const modelName = '库存';

  export default {
    layout: 'dash-with-toolbar',
    head: {
      title: `${modelName} - 库存现状`
    },
    components: {
      InventeryNoData,
      InventeryDataList
    },
    data: () => ({
      isChecking: true,
      data: [],
      cols: [],
      typeTitle: '库存状况',
      tools: [{
        title: '库存状况',
        href: '/inventory'
      }, {
        title: '分析报表',
        href: '/inventory/analyst'
      }]
    }),
    mounted() {
      if (process.browser) {
        const storedData = JSON.parse(window.localStorage.getItem('currentData'));
        const storedCols = JSON.parse(window.localStorage.getItem('currentCols'));
        if (
          (storedData && storedData.length > 0) &&
          (storedCols && storedCols.length > 0)
        ) {
          this.data = storedData;
          this.cols = storedCols;
        }
      }
      this.isChecking = false;
    },
    methods: {
      onLoadInventoryData(fc) {
        this.data = fc.data;
        this.cols = fc.cols;
        if (process.browser) {
          window.localStorage.setItem('currentData', JSON.stringify(this.data));
          window.localStorage.setItem('currentCols', JSON.stringify(this.cols));
        }
      }
    }
  };
</script>
