<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Investment</div>
      </v-card-title>
      <v-card-text>
        <template>
          <div class="my-3">
            <div class="subheading secondary--text text--lighten-2">Name</div>
            <div class="title primary--text text--darken-2" v-if="investment">{{investment.name}}</div>
            <div class="title primary--text text--darken-2" v-else>-----</div>
          </div>
          <div class="my-3">
            <div class="subheading secondary--text text--lighten-2">Description</div>
            <div
              class="title primary--text text--darken-2"
              v-if="investment"
            >{{investment.description}}</div>
            <div class="title primary--text text--darken-2" v-else>-----</div>
          </div>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Rate" v-model="rate" type="number" required />
            <v-text-field label="LockPeriod" v-model="lockPeriod" type="number" required />
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IInvestment, IInvestmentCreate, IInvestmentUpdate } from "@/interfaces";
import {
  dispatchUpdateInvestment,
  dispatchGetInvestments,
  dispatchCreateInvestment,
} from "@/store/admin/actions";
import { readAdminOneInvestment } from "@/store/admin/getters";

@Component
export default class EditUser extends Vue {
  public valid = true;
  public name: string = "";
  public description: string = "";
  public rate: number = 0;
  public lockPeriod: number = 0;

  public async mounted() {
    await dispatchGetInvestments(this.$store);
    this.reset();
  }

  public reset() {
    this.$validator.reset();
    if (this.investment) {
      this.name = this.investment.name;
      this.description = this.investment.description;
      this.rate = this.investment.rate;
      this.lockPeriod = this.investment.lock_period;
    }
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedInvestment: IInvestmentUpdate = {};

      if (this.name) {
        updatedInvestment.rate = this.rate;
      }

      if (this.lockPeriod) {
        updatedInvestment.lock_period = this.lockPeriod;
      }
      await dispatchUpdateInvestment(this.$store, {
        id: this.investment!.id,
        investment: updatedInvestment,
      });
      this.$router.push("/main/admin/investments");
    }
  }

  get investment() {
    return readAdminOneInvestment(this.$store)(
      +this.$router.currentRoute.params.id
    );
  }
}
</script>
