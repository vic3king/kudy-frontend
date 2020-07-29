<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Invest in ....</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field type="number" label="Amount" v-model="amount" required></v-text-field>
             <v-text-field type="string" label="Duration(days till maturity)" v-model="duration" required></v-text-field>
            <!-- <v-row>
              <v-col cols="12" sm="6">
                <v-date-picker v-model="date" range></v-date-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date range"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                model: {{ date }}
              </v-col>
            </v-row>-->
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
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { readUserProfile } from '@/store/main/getters';
import { IInvest } from '@/interfaces';
import {
  dispatchInvest,
} from '@/store/main/actions';

@Component
export default class CreateInvestment extends Vue {
  public valid = false;
  public amount = 0;
  public duration = 0;


  public reset() {
    this.amount = 0;
    this.duration = 14;
    this.$validator.reset();
  }

  public cancel() {
    this.$router.back();
  }

  get user() {
    return readUserProfile(this.$store);
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedInvestment: IInvest = {
        amount: this.amount,
        duration: this.duration,
        investment_id: Number(this.$router.currentRoute.params.id),
        owner_id: this.user!.id,
      };

      await dispatchInvest(this.$store, updatedInvestment);
    }
  }
}
</script>



