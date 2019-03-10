/** this is for /inventory/overview */

<template>
  <v-container fluid>
    <v-layout align-center justify-end wrap>
      <v-flex class="caption text-xs-right" xs12 sm7>
        统计周期为
        <span class="font-weight-bold pink--text mr-1">{{ inventoryT.title }}</span>
        年销售增长目标为
        <span class="font-weight-bold pink--text">{{ aimIncRate }}%</span>
        <br />
        原始数据生成时间：<strong>{{ dod }}</strong>
      </v-flex>
      <v-btn
        color="pink"
        class="mb-0 mt-0"
        @click.stop="isDrawerOn = !isDrawerOn"
      >
        <v-icon left>
          tune
        </v-icon>
        调整
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="ma-0"
            v-on="on"
            @click.stop="isDrawerOn = !isDrawerOn"
          >
            <v-icon>save_alt</v-icon>
          </v-btn>
        </template>
        <span>下载报表</span>
      </v-tooltip>
    </v-layout>
    <v-layout align-end wrap>
      <v-flex
        xs12
        md7
        mb-2
      >
        <v-text-field
          v-model="searchQ"
          :loading="isSearching"
          prepend-inner-icon="search"
          label="搜索..."
          clearable
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout align-center>
    </v-layout>
    <v-data-table
      :search="searchQ"
      :headers="headers"
      :items="desserts"
      :loading="isLoading"
      :rows-per-page-items="[20, 30, 50, 100]"
      no-data-text="缺数据，在搬运！"
      :no-results-text="`没有找到与「${searchQ}」相关的数据！`"
      rows-per-page-text="每页显示"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          {{ props.item.sku }}
        </td>
        <td>
          {{ props.item.name }}
        </td>
        <td class="text-xs-right">
          {{ props.item.sellable }}
        </td>
        <td class="text-xs-right">
          {{ props.item.unitsShippedIdx }}
        </td>
        <td class="text-xs-right">
          {{ props.item.unitsPerWeek }}
        </td>
        <td class="text-xs-right">
          <span v-if="props.item.unitsToSell === '-'">
            {{ props.item.unitsToSell }}
          </span>
          <span v-else-if="(props.item.unitsToSell * 7 - safeInventory) > 30">
            {{ props.item.unitsToSell }} 周
            <span class="caption grey--text">
              {{ Math.floor(props.item.unitsToSell * 7) }} 天
            </span>
          </span>
          <span
            v-else-if="props.item.unitsToSell * 7 < safeInventory"
            class="red--text"
          >
            {{ props.item.unitsToSell }} 周
            <span class="caption grey--text">
              {{ Math.floor(props.item.unitsToSell * 7) }} 天
            </span>
          </span>
          <span v-else class="warning--text">
            {{ props.item.unitsToSell }} 周
            <span v-if="props.item.unitsToSell > 0" class="caption grey--text">
              {{ Math.floor(props.item.unitsToSell * 7) }} 天
            </span>
          </span>
        </td>
      </template>
      <template v-slot:pageText="props">
        当前：{{ props.pageStart }} - {{ props.pageStop }}， 共计 {{ props.itemsLength }} 条。
      </template>
    </v-data-table>
    <v-navigation-drawer
      v-model="isDrawerOn"
      right
      absolute
      temporary
    >
      <v-container fluid>
        <v-layout column>
          <v-flex pb-4 class="title">
            调整分析参数
          </v-flex>
          <v-flex>
            <v-text-field
              ref="newAimIncRate"
              v-model="tmpaimIncRate"
              label="设定年度增长目标"
              suffix="%"
              type="number"
              min="101"
              max="999"
              hide-details
            ></v-text-field>
          </v-flex>
          <v-flex mt-2>
            <v-layout row fill-height justify-space-around>
              <v-flex pa-2>
                <v-text-field
                  v-model="tmpmIncRate"
                  label="月增长率(12月)"
                  suffix="%"
                  disabled
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex pa-2>
                <v-text-field
                  v-model="tmpwIncRate"
                  label="周增长率(52周)"
                  suffix="%"
                  disabled
                  hide-details
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex class="caption v-messages v-messages__message theme--dark pl-2 pr-2">
              以当前数据日期为起始时间，为实现年度增长目标，需计算平均月增长率和周增长率。
            </v-flex>
          </v-flex>
          <v-flex mt-4>
            <v-select
              v-model="inventoryT"
              return-object
              :items="soldTerms"
              item-text="title"
              item-value="index"
              label="选择销售周期"
              hint="选择销售周期作为统计周期，计算时，将针对每个SKU，计算在该周期内的平均周销量。"
              persistent-hint
            ></v-select>
          </v-flex>
          <v-flex mt-4 mb-1>
            <v-text-field
              v-model="safeInventory"
              label="安全库存"
              suffix="天"
              type="number"
              disabled
              hide-details
            ></v-text-field>
          </v-flex>
          <v-flex pt-4 pb-3>
            <v-divider></v-divider>
          </v-flex>
          <v-btn color="pink" @click="setNewRates">
            确定
          </v-btn>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
  import moment from 'moment';
  import _drop from 'lodash.drop';
  // import _filter from 'lodash.filter';
  import _indexof from 'lodash.indexof';
  import _map from 'lodash.map';
  // import _orderby from 'lodash.orderby';

  import Sleep from '@@/utils/sleep';
  import inventory from '../../static/data/inventory.json';

  const modelName = '库存';

  export default {
    layout: 'dash-with-toolbar',
    data: () => ({
      isLoading: true,
      isSearching: false,
      dod: '...',
      searchQ: '',
      inventoryT: { title: '近90天', index: inventory.unitsShipped.unitsShippedIn90, days: 90 },
      data: [],
      cols: [],
      soldTerms: [
        { title: '近30天', index: inventory.unitsShipped.unitsShippedIn30, days: 30 },
        { title: '近90天', index: inventory.unitsShipped.unitsShippedIn90, days: 90 },
        { title: '近180天', index: inventory.unitsShipped.unitsShippedIn180, days: 180 }
      ],
      isDrawerOn: false,
      aimIncRate: 200,
      mIncRate: 0,
      wIncRate: 0,
      tmpaimIncRate: 200,
      tmpmIncRate: 0,
      tmpwIncRate: 0,
      safeInventory: 90,
      headers: [
        {
          text: 'SKU',
          align: 'left',
          sortable: true,
          value: 'sku',
          width: '150'
        },
        {
          text: '产品名称',
          align: 'left',
          value: 'name',
          width: '270'
        },
        { text: '可售(件)', value: 'sellable', sortable: true, align: 'right' },
        { text: '近90天出售(件)', value: 'unitsShippedIdx', sortable: true, align: 'right' },
        { text: '近90天周转率(件/周)', value: 'unitsPerWeek', sortable: true, align: 'right' },
        { text: '剩余可销售', value: 'unitsToSell', sortable: true, align: 'right', width: '170' }
        // { text: '剩余可销售(月)', value: 'unitsToSellMonths', sortable: true, align: 'right' }
      ],
      desserts: []
    }),
    watch: {
      inventoryT() {
        this.headers[3].text = `${this.inventoryT.title}出售(件)`;
        this.headers[4].text = `${this.inventoryT.title}周转率(件)`;
      },
      tmpaimIncRate() {
        this.tmpmIncRate = Math.floor((Math.pow((this.tmpaimIncRate / 100), 1 / 12) - 1) * 1000) / 10;
        this.tmpwIncRate = Math.floor((Math.pow((this.tmpaimIncRate / 100), 1 / 52) - 1) * 1000) / 10;
      }
    },
    async created() {
      this.mIncRate = Math.floor((Math.pow((this.aimIncRate / 100), 1 / 12) - 1) * 1000) / 10;
      this.wIncRate = Math.floor((Math.pow((this.aimIncRate / 100), 1 / 52) - 1) * 1000) / 10;
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
        this.desserts = await this.filterData();
        this.dod = moment(this.data[1][0]).format('MMMM Do YYYY, h:mm:ss a');
        this.isLoading = false;
      }
      this.tmpmIncRate = Math.floor((Math.pow((this.tmpaimIncRate / 100), 1 / 12) - 1) * 1000) / 10;
      this.tmpwIncRate = Math.floor((Math.pow((this.tmpaimIncRate / 100), 1 / 52) - 1) * 1000) / 10;
    },
    methods: {
      async onSearch() {
        this.isSearching = true;
        this.desserts = await this.filterData();
        this.isSearching = false;
      },
      async filterData() {
        let items = [];
        // let cols = [];
        if (this.cols && this.data && this.data.length > 1) {
          const idxSellable = _indexof(this.data[0], inventory.basicIdx.sellableQty);
          const idxSku = _indexof(this.data[0], inventory.basicIdx.sku);
          const idxName = _indexof(this.data[0], inventory.basicIdx.name);
          const idxUnitsShipped = _indexof(this.data[0], this.inventoryT.index);
          const dataContents = _drop(this.data);
          let unitsPerWeek = '-';
          let unitsPerMonth = '-';
          if (this.searchQ === '' || this.searchQ === undefined) {
            items = _map(dataContents, item => {
              unitsPerWeek = Math.floor(item[idxUnitsShipped] / (this.inventoryT.days / 7) * 10) / 10;
              unitsPerMonth = Math.floor(item[idxUnitsShipped] / (this.inventoryT.days / 30) * 10) / 10;
              const leftWeeks = this.getLeftWeeks(item[idxSellable], unitsPerWeek);
              // const leftMonths = this.getLeftMonths(item[idxSellable], unitsPerMonth);
              return {
                sku: item[idxSku],
                sellable: item[idxSellable],
                unitsShippedIdx: item[idxUnitsShipped],
                name: item[idxName],
                unitsPerWeek,
                unitsToSell: leftWeeks
                // unitsToSellMonths: leftMonths
                // unitsPerWeek > 0 ? Math.round(item[idxSellable] / unitsPerWeek) : '-'
              };
            });
          } else {
            dataContents.forEach(item => {
              if (item[idxSku].includes(this.searchQ)) {
                unitsPerWeek = Math.floor(item[idxUnitsShipped] / 7 * 100) / 100;
                const leftWeeks = this.getLeftWeeks(item[idxSellable], unitsPerWeek);
                items.push({
                  sku: item[idxSku],
                  sellable: item[idxSellable],
                  unitsShippedIdx: item[idxUnitsShipped],
                  name: item[idxName],
                  unitsPerWeek,
                  unitsPerMonth,
                  unitsToSell: leftWeeks
                  // unitsToSellMonths: leftWeeks
                  // unitsPerWeek > 0 ? Math.round(item[idxSellable] / unitsPerWeek) : '-',
                });
              }
            });
          }
        }
        await Sleep(1000);
        return items;
      },
      async setNewRates() {
        this.isLoading = true;
        this.aimIncRate = this.$refs.newAimIncRate.value;
        this.mIncRate = Math.floor((Math.pow((this.aimIncRate / 100), 1 / 12) - 1) * 1000) / 10;
        this.wIncRate = Math.floor((Math.pow((this.aimIncRate / 100), 1 / 52) - 1) * 1000) / 10;
        this.isDrawerOn = !this.isDrawerOn;
        this.desserts = await this.filterData();
        this.isLoading = false;
      },
      getLeftWeeks(sellable, avWeekSold) {
        if (
          sellable < avWeekSold ||
          this.wIncRate === 0 ||
          sellable === 0
        ) {
          return 0;
        }
        if (
          this.wIncRate < 0 ||
          avWeekSold === 0 ||
          avWeekSold === undefined
        ) {
          return '-';
        }
        const t = Math.floor(sellable / avWeekSold);
        let tempWSold = 0;
        let tempWSoldT = 0;
        let leftWeeks = 0;
        for (let i = 0; i <= t; i++) {
          if (i === 0) {
            tempWSold = avWeekSold;
            tempWSoldT += avWeekSold;
          } else {
            tempWSold = tempWSold * (1 + (this.wIncRate / 100));
            tempWSoldT += tempWSold;
          }
          if (sellable === tempWSoldT) {
            leftWeeks = i + 1;
            break;
          }
          if (sellable < tempWSoldT) {
            leftWeeks = i + Math.floor(
              (sellable - (tempWSoldT - tempWSold)) / (tempWSold * (1 + (this.wIncRate / 100))) * 10
            ) / 10;
            break;
          }
        }
        return leftWeeks;
      },
      getLeftMonths(sellable, avMonthSold) {
        if (
          sellable < avMonthSold ||
          this.mIncRate === 0 ||
          sellable === 0
        ) {
          return 0;
        }
        if (
          this.mIncRate < 0 ||
          avMonthSold === 0 ||
          avMonthSold === undefined
        ) {
          return '-';
        }
        const t = Math.floor(sellable / avMonthSold);
        let tempMSold = 0;
        let tempMSoldT = 0;
        let leftMonths = 0;
        for (let i = 0; i <= t; i++) {
          if (i === 0) {
            tempMSold = avMonthSold;
            tempMSoldT += avMonthSold;
          } else {
            tempMSold = tempMSold * (1 + (this.mIncRate / 100));
            tempMSoldT += tempMSold;
          }
          if (sellable === tempMSoldT) {
            leftMonths = i + 1;
            break;
          }
          if (sellable < tempMSoldT) {
            leftMonths = i + Math.floor(
              (sellable - (tempMSoldT - tempMSold)) / (tempMSold * (1 + (this.mIncRate / 100))) * 10
            ) / 10;
            break;
          }
        }
        return leftMonths;
      }
    },
    head: {
      title: `${modelName} - 分析报表`
    }
  };
</script>
