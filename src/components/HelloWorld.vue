<template>
  <div class="hello">
    <h1 v-show="isConnected">{{ account }}</h1>
    <button v-show="!isConnected" @click="connect">Connect Ale</button>
    <div style="color: #f00" v-show="isConnected">Connect Success!</div>
    <div class="container text-center  mt-5 mb-5">
    <table class="table" id="firstTable" align-center>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>RIP</th>
          <th>Died</th>
          <th>F</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key=row.id>
          <td>{{row.id}}</td>
          <td>{{row.name}}</td>
          <td>{{row.RIPCount}}</td>
          <td>{{row.died}}</td>
          <td><button @click="respect(row)">pay respect</button></td>
        </tr>
      </tbody>
    </table>
    </div>
    <p></p>
    <button v-show="isConnected" @click="approveMoney">load tombs</button>
    <p></p>
    
    <h3>add a tomb</h3>
    <label for="name">Name:</label>
    <input ref="inputname" id="name" v-model="name">
    
    <label for="passday">Pass day:</label>      
    <input ref="inputday" id="passaday" v-model="passday">
    <p></p>
    <button v-show="isConnected" @click="addMoral">add</button> 
    
  </div>
</template>

<script>

import services from "@/api";

export default {
  data() {
    return {
      account: "",
      isConnected: false,
      rows: [],
      name: "",
      passday: "",
    };
  },
  watch: {
    "$store.state.dapp": {
      handler(val) {
        this.account = val.account;
        this.isConnected = val.isConnected;
        //this.rows = val.rows;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    connect() {
      window["aleereum"] && window["aleereum"].connect();
    },
    addMoral() {
        services.approve(this.name, this.passday).then((res) => {
        console.log(res);
      });
        this.name = [];
        this.passday = [];
      },
    respect(row) {
      let id = +row.id.toString(10);
      //console.log(id);
      services.pressF(id).then((res) => {
        console.log(res);
      });
    },
    approveMoney() {
      let self = this;
      self.rows = [];
      services.getCount().then(function(moralsCount) {

      moralsCount = +moralsCount.toString(10);
      console.log(moralsCount);
      
      
        for (var i = 1; i <= moralsCount; i++) {
          (services.getdata(i).then((moral) => {
            moral[0] = moral[0].toString(10);
            moral[2].toString(10);
            //console.log(moral);
            self.rows.push(moral);
          }));
        }

      });
    },
    
  },
};
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
