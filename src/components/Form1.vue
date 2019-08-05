<template>
  <div class="ui centered card">
    <h1 class="ui header">Subscription</h1>

    <div class="content">
      <div class="ui form">

        <!-- User info -->
        <fieldset class="ui segment fields">

          <div class="field">
            <label>First Name</label>
            <input type="text" v-model="firstName">
            <div class="ui pointing red basic label" v-show="errors['firstName']">
              {{ errors['firstName'] }}
            </div>
          </div>

          <div class="field">
            <label>Last Name</label>
            <input type="text" v-model="lastName">
            <div class="ui pointing red basic label" v-show="errors['lastName']">
              {{ errors['lastName'] }}
            </div>
          </div>
              
        </fieldset>

        <div class="ui buttons">
          <button class="ui disabled button" disabled>
            Back
          </button>
          <button class="ui primary button" @click="next()">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
              
import Autocomplete from './Autocomplete';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    Autocomplete,
  },

  data() {
    return {
      users: [],
      errors: {},       // for form validation
    };
  },

  computed: {
    ...mapFields([
      'form.fullName',
      'form.firstName',
    ]),
  },


  methods: {
    next() {
      if (this.validateForm()) {
        this.$router.push('/form2');
      }
    },


    // Validate form and return true if everything is ok
    validateForm() {
      this.errors = [];


      if (!this.firstName) {
        this.errors['firstName'] = 'First name is required';
      }

      if (!this.lastName) {
        this.errors['lastName'] = 'Last name is required';
      }

      return Object.keys(this.errors).length === 0;
    },
  },
}
</script>
