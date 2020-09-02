<template>
  <div>
    <button v-on:click='authorizeSpotify'>Authorize</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    authorizeSpotify: function() {
      axios.get('http://bskaurud.local.coschedule.ngrok.io/authorize')
        .then((result) => {
          const { authorizeUrl } = result.data || {};
          window.open(authorizeUrl, 'DescriptiveWindowName');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
