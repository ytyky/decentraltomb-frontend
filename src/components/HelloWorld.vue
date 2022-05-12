<template>
  <div class="hello">
    <h1 v-show="isConnected">{{ account }}</h1>
    <button v-show="!isConnected" @click="connect">Connect Ale</button>
    <div style="color: #f00" v-show="isConnected">Connect Success!</div>
    <div id="firstTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>RIP</th>
          <th>Died</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key=row.id>
          <td>{{row.id}}</td>
          <td>{{row.name}}</td>
          <td>{{row.RIPCount}}</td>
          <td>{{row.died}}</td>
        </tr>
      </tbody>
    </div>
    <p></p>
    <button v-show="isConnected" @click="approveMoney">approve $100</button>
  </div>
</template>

<script>

import services from "@/api";

export default {
  data() {
    return {
      account: "",
      isConnected: false,
      rows: [{id: "123", name: "ty", RIPCount: "2", died: "na"}],
    };
  },
  watch: {
    "$store.state.dapp": {
      handler(val) {
        this.account = val.account;
        this.isConnected = val.isConnected;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    connect() {
      window["aleereum"] && window["aleereum"].connect();
    },
    approveMoney() {
      let self = this;
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
      services.approve(100).then((res) => {
        console.log(res);
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
