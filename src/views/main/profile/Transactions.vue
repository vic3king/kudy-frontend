<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">My Wallet</div>
      </v-card-title>
      <v-card-text>
        <div class="my-4">
          <div class="subheading secondary--text text--lighten-3">Balance</div>
          <div
            class="title primary--text text--darken-2"
            v-if="walletBalance && walletBalance.balance"
          >#{{walletBalance.balance}}</div>
          <div class="title primary--text text--darken-2" v-else>-----</div>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Transactions</div>
      </v-card-title>
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('transaction_type')" slot="activator">
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">By transaction type</span>
          </v-btn>
          <span>Sort by transaction type</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('amount')" slot="activator">
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">By Amount</span>
          </v-btn>
          <span>Sort by transaction amount</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="transaction in transactions" :key="transaction.id" :class="`pa-3 transaction ${transaction.transaction_type}`">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <div class="caption grey--text">Reference</div>
            <div>{{transaction.reference}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Amount</div>
            <div>{{transaction.amount}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Date</div>
            <div>{{(new Date(transaction.created_at)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3')}}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${transaction.transaction_type} white--text my-2 caption`">{{transaction.transaction_type}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import {
  readUserWalletBalance,
  readTransactionHistory,
} from '@/store/main/getters';
import {
  dispatchGetTransactionsHistory,
  dispatchGetInvestmentsHistory,
} from '@/store/main/actions';
@Component
export default class UserProfile extends Vue {
  get walletBalance() {
    const userWalletBalance = readUserWalletBalance(this.$store);
    if (userWalletBalance) {
      return userWalletBalance;
    }
  }

  get transactions() {
    return readTransactionHistory(this.$store);
  }

  public async mounted() {
    await dispatchGetTransactionsHistory(this.$store);
  }

  public sortBy(prop) {
      this.transactions.sort((a, b) => a[prop] < b[prop] ? -1 : 1);
    }
}
</script>

<style>
.transaction.deposit {
  border-left: 4px solid #3cd1c2;
}
.transaction.credit {
  border-left: 4px solid #ffaa2c;
}
.transaction.debit {
  border-left: 4px solid #f83e70;
}
.v-chip.deposit {
  background: #3cd1c2;
}
.v-chip.credit {
  background: #ffaa2c;
}
.v-chip.debit {
  background: #f83e70;
}
</style>