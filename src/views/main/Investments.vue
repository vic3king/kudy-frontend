<template>
  <div class="investments">
    <v-toolbar light>
      <v-toolbar-title>List of investment opportunities</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/wallet/top-up">Top up wallet</v-btn>
    </v-toolbar>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="investment in investments" :key="investment.id">
          <div slot="header" class="py-1">{{ investment.name }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div>{{ investment.description }}</div>
              <br />
              <div class="font-weight-bold">Rate(% interest): {{ investment.rate }}%</div>
              <br />
              <div
                class="font-weight-bold"
              >Lock Period(Days before withdrawal): {{ investment.lock_period }}%</div>
            </v-card-text>
          </v-card>
          <v-card-actions class="justify-center">
            <v-btn
              flat
              :to="{name: 'main-investments-invest', params: {id: investment.id}}"
              color="orange"
            >Invest</v-btn>
            <v-btn
              flat
              :to="{name: 'main-investments-invest', params: {id: investment.id}}"
              color="orange"
            >Withdraw</v-btn>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { IInvestment } from "@/interfaces";
import { readInvestments } from "@/store/admin/getters";
import { dispatchGetInvestments, } from "@/store/admin/actions";
import { dispatchGetUserWallet, } from "@/store/main/actions";

@Component
export default class Investments extends Vue {
  public headers = [
    {
      text: "Name",
      sortable: true,
      value: "name",
      align: "left",
    },
    {
      text: "Description",
      sortable: true,
      value: "description",
      align: "left",
    },
    {
      text: "Name",
      sortable: true,
      value: "name",
      align: "left",
    },
    {
      text: "Rate",
      sortable: true,
      value: "rate",
      align: "left",
    },
    {
      text: "Lock Period",
      sortable: true,
      value: "lock_period",
      align: "left",
    },
    {
      text: "Actions",
      value: "id",
    },
  ];
  get investments() {
    return readInvestments(this.$store);
  }

  public async mounted() {
    await dispatchGetInvestments(this.$store);
      await dispatchGetUserWallet(this.$store)

  }
}
</script>
