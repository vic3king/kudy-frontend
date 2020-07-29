<template>
  <div class="investments">
    <v-toolbar light>
      <v-toolbar-title>My Investments</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/investments/all">Invest</v-btn>
    </v-toolbar>
    <v-container class="my-5">
      <v-layout>
        <v-flex>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 md6 lg3 v-for="history in investments" :key="history.id">
                  <v-card flat tile>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                      aspect-ratio="2.75"
                    ></v-img>
                    <v-card-title primary-title class="justify-center">
                      <div>
                        <h3 class="headline mb-0">Investment name</h3>
                        <div>Amount: {{history.amount}}</div>
                        <div>Duration: {{history.duration}}</div>
                        <div>Returns: #{{history.returns}}</div>
                        <div>Date: {{(new Date(history.created_at)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3')}}</div>
                      </div>
                    </v-card-title>

                    <v-card-actions class="justify-center">
                      <v-btn flat color="orange" @click="withdrawInvestment(history.id)">Withdraw</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IInvestment, IWithdrawInvestment } from '@/interfaces';
import { readInvestments } from '@/store/admin/getters';
import {
  dispatchInvest,
  dispatchGetInvestmentsHistory,
  dispatchWithdrawInvestment,
  dispatchGetUserWallet,
} from '@/store/main/actions';
import { readInvestmentHistory } from '../../store/main/getters';

@Component
export default class Investments extends Vue {
  public headers = [
    {
      text: 'Name',
      sortable: true,
      value: 'name',
      align: 'left',
    },
    {
      text: 'Description',
      sortable: true,
      value: 'description',
      align: 'left',
    },
    {
      text: 'Name',
      sortable: true,
      value: 'name',
      align: 'left',
    },
    {
      text: 'Rate',
      sortable: true,
      value: 'rate',
      align: 'left',
    },
    {
      text: 'Lock Period',
      sortable: true,
      value: 'lock_period',
      align: 'left',
    },
    {
      text: 'Actions',
      value: 'id',
    },
  ];
  get investments() {
    return readInvestmentHistory(this.$store);
  }

  public async mounted() {
    await dispatchGetInvestmentsHistory(this.$store);
  }

  public async withdrawInvestment(investmentId) {
    const withdrawInvestment: IWithdrawInvestment = {
      investment_id: investmentId,
    };

    await dispatchWithdrawInvestment(this.$store, withdrawInvestment);
    await dispatchGetUserWallet(this.$store);
  }
}
</script>
