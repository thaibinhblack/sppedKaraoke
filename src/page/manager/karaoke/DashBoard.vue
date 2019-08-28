<template>
  <div class="dashboard">
    <v-container fluid class="custom" grid-list-xs>
        <v-row>
            <v-col cols="12" sm="12">
                <h3>THỐNG KÊ SỐ LƯỢNG KHÁCH TRONG VÒNG 12 THÁNG</h3>
            </v-col>
            <v-col cols="12" md="6">
                <v-card height="410px">
                    <v-data-table
                    :headers="dashboardBar"
                    :items="itemBars"
                    style="padding:10px">
                    
                    </v-data-table>
                </v-card>
                
            </v-col>
            <v-col cols="12" md="6">
                <v-card width="100%" height="410px" >
                    <apexcharts width="100%" height="100%" type="bar" :options="chartOptions" :series="series"></apexcharts>
                </v-card>
                
            </v-col>
        </v-row>
    </v-container>
    
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Chart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 20, 21, 100, 120]
      }],
      dashboardBar: [
          {text: 'Đối tượng khách', value: 'ObjectUser',sorttable: true, width: '200px'},
          {text: 'T1', value: 'T1', sorttable: false,align: 'center'},
          {text: 'T2', value: 'T2', sorttable: false,align: 'center'},
          {text: 'T3', value: 'T3', sorttable: false,align: 'center'},
          {text: 'T4', value: 'T4', sorttable: false,align: 'center'},
          {text: 'T5', value: 'T5', sorttable: false,align: 'center'},
          {text: 'T6', value: 'T6', sorttable: false,align: 'center'},
          {text: 'T7', value: 'T7', sorttable: false,align: 'center'},
          {text: 'T8', value: 'T8', sorttable: false,align: 'center'},
          {text: 'T9', value: 'T9', sorttable: false,align: 'center'},
          {text: 'T10', value: 'T10', sorttable: false,align: 'center'},
          {text: 'T11', value: 'T11', sorttable: false,align: 'center'},
          {text: 'T12', value: 'T12', sorttable: false,align: 'center'},
      ],
      itemBars: [
          { ObjectUser: 'Khách đi hát đặt tại chỗ', T1: 10, T2: 20, T3: 30, T4: 40, T5: 50, T6: 60,T7: 10, T8: 20, T9: 30, T10: 40, T11: 50, T12: 60},
          { ObjectUser: 'Khách đi hát đặt online', T1: 10, T2: 20, T3: 30, T4: 40, T5: 50, T6: 60,T7: 10, T8: 20, T9: 30, T10: 40, T11: 50, T12: 60},
          { ObjectUser: 'Khách đi hát tổ chức event', T1: 10, T2: 20, T3: 30, T4: 40, T5: 50, T6: 60,T7: 10, T8: 20, T9: 30, T10: 40, T11: 50, T12: 60},
          { ObjectUser: 'Khách đi hát tổ chức sinh nhật', T1: 10, T2: 20, T3: 30, T4: 40, T5: 50, T6: 60,T7: 10, T8: 20, T9: 30, T10: 40, T11: 50, T12: 60},
          { ObjectUser: 'Khách đi hát là thành viên của hệ thống', T1: 10, T2: 20, T3: 30, T4: 40, T5: 50, T6: 60,T7: 10, T8: 20, T9: 30, T10: 40, T11: 50, T12: 60},
          { ObjectUser: 'Khách đi hát là thành viên của quán', T1: 10, T2: 20, T3: 30, T4: 40, T5: 50, T6: 60,T7: 10, T8: 20, T9: 30, T10: 40, T11: 50, T12: 60},
      ]
    }
  },
  created()
  {
        console.log(this.$session.get('user_facebook'))
  }
}
</script>

<style scoped>
.container.custom {padding: 15px 20px;}
</style>
