<template>
  <v-container fluid grid-list-md>
    <v-card class="mb-2" light>
      <v-card-text>
        <v-layout align-center>
          <v-icon color="success">
            watch_later
          </v-icon>
          &nbsp;
          库存时间：<strong>{{ dod }}</strong>。
        </v-layout>
      </v-card-text>
    </v-card>
    <v-layout wrap>
      <v-flex xs12 sm4>
        <v-layout column>
          <v-flex>
            <v-card color="primary">
              <v-card-text>
                <div class="mb-1 font-weight-bold">
                  SKU总数
                  <div class="grey--text text--lighten-1 font-weight-thin caption">
                    当前库存中所有的SKU数量，包括状况为“New”和“No Listing”的SKU。
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="display-2 mt-3">
                  {{ skuCount.totalCount }}
                </div>
                <div class="text-align-right">
                  New - {{ skuCount.totalNewCount }}
                  |
                  No Listing - {{ skuCount.totalNoCount }}
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card color="warning">
              <v-card-text>
                <div class="mb-1 font-weight-bold">
                  No Listing且无可售商品的SKU
                </div>
                <v-divider></v-divider>
                <div class="display-1 mt-3">
                  {{ skuCount.noNoskus.length }}
                </div>
                <v-expansion-panel v-if="skuCount.noNoskus.length > 0" light>
                  <v-expansion-panel-content>
                    <template v-slot:header>
                      <div>查看</div>
                    </template>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        <ul>
                          <li
                            v-for="(item, i) in skuCount.noNoskus"
                            :key="i"
                          >
                            {{ item }}
                          </li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card color="pink">
              <v-card-text>
                <div class="mb-1 font-weight-bold">
                  No Listing但有可售商品的SKU
                </div>
                <v-divider></v-divider>
                <div class="display-1 mt-3">
                  {{ skuCount.noWithSkus.length }}
                </div>
                <v-expansion-panel v-if="skuCount.noWithSkus.length > 0" light>
                  <v-expansion-panel-content>
                    <template v-slot:header>
                      <div>查看</div>
                    </template>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        <ul>
                          <li
                            v-for="(item, i) in skuCount.noWithSkus"
                            :key="i"
                          >
                            {{ item.sku }} - {{ item.sellable }} 件
                          </li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm8>
        <v-layout wrap>
          <v-flex xs12 md7>
            <v-card>
              <v-card-text>
                <div class="mb-1 font-weight-bold">
                  Top10 - 90天出货量
                </div>
                <v-divider></v-divider>
                <div class="mt-3">
                  <v-list two-line>
                    <template
                      v-for="(item, i) in shippedCount.unitsShippedIn90Skus"
                    >
                      <v-list-tile
                        v-if="i < 10"
                        :key="i"
                      >
                        <v-list-tile-avatar
                          :color="i === 0 ? 'warning' : 'teal'"
                        >
                          <v-icon v-if="i === 0">
                            thumb_up
                          </v-icon>
                          <span v-else class="white--text">
                            #{{ i + 1 }}
                          </span>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ item.sku }}
                          </v-list-tile-title>
                          <v-list-tile-sub-title class="caption">
                            共出售： {{ item.sold }} 件 <br />
                            剩余可售： {{ item.sellable }} 件
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md5>
            <v-layout column>
              <v-flex>
                <v-card>
                  <v-card-text>
                    <div class="mb-1 font-weight-bold">
                      91～180天库存的SKU
                    </div>
                    <v-divider></v-divider>
                    <div class="display-1 mt-3">
                      {{ invCount.between91and180Skus.length }}
                    </div>
                    <v-expansion-panel v-if="invCount.between91and180Skus.length > 0">
                      <v-expansion-panel-content>
                        <template v-slot:header>
                          <div>查看</div>
                        </template>
                        <v-card>
                          <v-card-text class="grey darken-2">
                            <ul>
                              <li
                                v-for="(item, i) in invCount.between91and180Skus"
                                :key="i"
                              >
                                {{ item.sku }} - {{ item.count }} 件
                              </li>
                            </ul>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card>
                  <v-card-text>
                    <div class="mb-1 font-weight-bold">
                      181～270天库存的SKU
                    </div>
                    <v-divider></v-divider>
                    <div class="display-1 mt-3">
                      {{ invCount.between181and270Skus.length }}
                    </div>
                    <v-expansion-panel v-if="invCount.between181and270Skus.length > 0">
                      <v-expansion-panel-content>
                        <template v-slot:header>
                          <div>查看</div>
                        </template>
                        <v-card>
                          <v-card-text class="grey darken-2">
                            <ul>
                              <li
                                v-for="(item, i) in invCount.between181and270Skus"
                                :key="i"
                              >
                                {{ item.sku }} - {{ item.count }} 件
                              </li>
                            </ul>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card>
                  <v-card-text>
                    <div class="mb-1 font-weight-bold">
                      271～365天库存的SKU
                    </div>
                    <v-divider></v-divider>
                    <div class="display-1 mt-3">
                      {{ invCount.between271and365Skus.length }}
                    </div>
                    <v-expansion-panel v-if="invCount.between271and365Skus.length > 0">
                      <v-expansion-panel-content>
                        <template v-slot:header>
                          <div>查看</div>
                        </template>
                        <v-card>
                          <v-card-text class="grey darken-2">
                            <ul>
                              <li
                                v-for="(item, i) in invCount.between271and365Skus"
                                :key="i"
                              >
                                {{ item.sku }} - {{ item.count }} 件
                              </li>
                            </ul>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card>
                  <v-card-text>
                    <div class="mb-1 font-weight-bold">
                      超过365天库存的SKU
                    </div>
                    <v-divider></v-divider>
                    <div class="display-1 mt-3">
                      {{ invCount.above365Skus.length }}
                    </div>
                    <v-expansion-panel v-if="invCount.above365Skus.length > 0">
                      <v-expansion-panel-content>
                        <template v-slot:header>
                          <div>查看</div>
                        </template>
                        <v-card>
                          <v-card-text class="grey darken-2">
                            <ul>
                              <li
                                v-for="(item, i) in invCount.above365Skus"
                                :key="i"
                              >
                                {{ item.sku }} - {{ item.count }} 件
                              </li>
                            </ul>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import moment from 'moment';
  import _drop from 'lodash.drop';
  import _filter from 'lodash.filter';
  import _indexof from 'lodash.indexof';
  import _map from 'lodash.map';
  import _orderby from 'lodash.orderby';

  const conditions = {
    new: 'New',
    no: 'No Listing'
  };
  const tOfdays = {
    below90: 'inv-age-0-to-90-days',
    between91and180: 'inv-age-91-to-180-days',
    between181and270: 'inv-age-181-to-270-days',
    between271and365: 'inv-age-271-to-365-days',
    above365: 'inv-age-365-plus-days'
  };
  const unitsShipped = {
    unitsShippedIn90: 'units-shipped-last-90-days'
  };
  const basicIdx = {
    sku: 'sku',
    sellableQty: 'sellable-quantity'
  };

  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      },
      cols: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      headers: [],
      dataContents: []
    }),
    computed: {
      dod() {
        const orgDate = moment(this.data[1][0]).format('MMMM Do YYYY, h:mm:ss a');
        return orgDate;
      },
      skuCount() {
        const totalCount = this.dataContents.length;
        const totalNewCount = _filter(this.dataContents, item => {
          return _indexof(item, conditions.new) > 0;
        }).length;
        const totalNoCount = _filter(this.dataContents, item => {
          return _indexof(item, conditions.no) > 0;
        }).length;

        const idxSellable = _indexof(this.headers, 'sellable-quantity');
        const idxSku = _indexof(this.headers, 'sku');
        const noListingWithSellable = _filter(this.dataContents, item => {
          return _indexof(item, conditions.no) > 0 && item[idxSellable] > 0;
        });
        const noWithSkus = _map(noListingWithSellable, item => {
          return {
            sku: item[idxSku],
            sellable: item[idxSellable]
          };
        });
        const noListingNoSellable = _filter(this.dataContents, item => {
          return _indexof(item, conditions.no) > 0 && item[idxSellable] === 0;
        });

        const noNoskus = _map(noListingNoSellable, item => {
          return item[idxSku];
        });

        return {
          totalCount,
          totalNewCount,
          totalNoCount,
          noWithSkus,
          noNoskus
        };
      },
      invCount() {
        const idxSellable = _indexof(this.headers, basicIdx.sellableQty);
        const idxSku = _indexof(this.headers, basicIdx.sku);
        const idxBetween91and180 = _indexof(this.headers, tOfdays.between91and180);
        const idxBetween181and270 = _indexof(this.headers, tOfdays.between181and270);
        const idxBetween271and365 = _indexof(this.headers, tOfdays.between271and365);
        const idxAbove365 = _indexof(this.headers, tOfdays.above365);

        const between91and180Skus = [];
        const between181and270Skus = [];
        const between271and365Skus = [];
        const above365Skus = [];

        this.dataContents.forEach(item => {
          if (item[idxBetween91and180] > 0 && item[idxSellable] > 0) {
            between91and180Skus.push({
              sku: item[idxSku],
              count: `${item[idxBetween91and180]}/${item[idxSellable]}`
            });
          }
          if (item[idxBetween181and270] > 0 && item[idxSellable] > 0) {
            between181and270Skus.push({
              sku: item[idxSku],
              count: `${item[idxBetween181and270]}/${item[idxSellable]}`
            });
          }
          if (item[idxBetween271and365] > 0 && item[idxSellable] > 0) {
            between271and365Skus.push({
              sku: item[idxSku],
              count: `${item[idxBetween271and365]}/${item[idxSellable]}`
            });
          }
          if (item[idxAbove365] > 0 && item[idxSellable] > 0) {
            above365Skus.push({
              sku: item[idxSku],
              count: `${item[idxAbove365]}/${item[idxSellable]}`
            });
          }
        });
        return {
          between91and180Skus,
          between181and270Skus,
          between271and365Skus,
          above365Skus
        };
      },
      shippedCount() {
        const idxSku = _indexof(this.headers, basicIdx.sku);
        const idxSellable = _indexof(this.headers, basicIdx.sellableQty);
        const idxUnitsShippedIn90 = _indexof(this.headers, unitsShipped.unitsShippedIn90);
        const unitsShippedIn90Skus = _map(this.dataContents, item => {
          return {
            sku: item[idxSku],
            sold: item[idxUnitsShippedIn90],
            sellable: item[idxSellable]
          };
        });
        return {
          unitsShippedIn90Skus: _orderby(unitsShippedIn90Skus, 'sold', 'desc')
        };
      }
    },
    mounted() {
      if (this.data.length > 0) {
        this.headers = this.data[0];
      }
      if (this.data.length > 1) {
        this.dataContents = _drop(this.data);
      }
    }
  };
</script>
