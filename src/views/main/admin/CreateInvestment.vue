<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Investment</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="Name" required></v-text-field>
            <v-text-field label="Description" v-model="Description" required></v-text-field>
            <v-layout align-center>
              <v-flex>
                <v-text-field label="Rate" v-model="Rate" type="number" required />
                <v-text-field label="LockPeriod" v-model="LockPeriod" type="number" required />
              </v-flex>
            </v-layout>
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
import { IInvestmentCreate } from "@/interfaces";
import {
  dispatchGetInvestments,
  dispatchCreateInvestment,
} from "@/store/admin/actions";

@Component
export default class CreateInvestment extends Vue {
  public valid = false;
  public Name: string = "";
  public Description: string = "";
  public Rate: number = 0;
  public LockPeriod: number = 0;

  public async mounted() {
    await dispatchGetInvestments(this.$store);
    this.reset();
  }

  public reset() {
    this.Name = "";
    this.Description = "";
    this.Rate = 0;
    this.LockPeriod = 0;
    this.$validator.reset();
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedInvestment: IInvestmentCreate = {
        name: this.Name,
        description: this.Description,
        rate: this.Rate,
        lock_period: this.LockPeriod,
      };

      await dispatchCreateInvestment(this.$store, updatedInvestment);
      this.$router.push("/main/admin/investments");
    }
  }
}
</script>
