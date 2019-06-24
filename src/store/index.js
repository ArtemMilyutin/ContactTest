import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        listCont:[
            { id:1, name: 'Vasya Pupkin', tel:[{id:1, num:'+38(071)654-12-32'}],
                email:[{mail:''}],dr_year: 2013, dr_month: 6,  dr_day: 6, site:'vk.com', company:'Астелит', group: ['friend','kolegi'], foto:'https://randomuser.me/api/portraits/men/65.jpg'},
            { id:2, name: 'Ivan Ivanov', tel:[{id:1, num:'+38(095)123-65-54'}],
                email:[{mail:'qwe@mail.ru'},{mail:'yui@mail.ru'}], dr_year:2000, dr_month: 5, dr_day: 14,site:'', company:'Астелит',group: ['friend'], foto:'https://randomuser.me/api/portraits/men/63.jpg'},
            { id:3, name: 'Petr Petrov', tel:[{id:1, num:'+38(071)654-98-87'},{id:2, num:'+38(099)147-35-65'}],
                email:[{mail:'tre@gmail.com'}], dr_year:1996, dr_month: 1, dr_day: 10,site:'ya.ru', company:'Газпром',group: ['kolegi'], foto:'https://randomuser.me/api/portraits/men/62.jpg'},
            { id:4, name: 'James Bond', tel:[{id:1, num:'+38(099)321-98-74'},{id:2, num:'+38(071)007-07-07'}],
                email:[{mail:'bond@gmail.com'}], dr_year:1985, dr_month: 7, dr_day: 19,site:'kino.dn.ua', company:'Газпром',group: ['kolegi'], foto:'https://randomuser.me/api/portraits/men/59.jpg'},
        ],

    },
    plugins: [createPersistedState({
        key: 'listCont',
        paths:['listCont'],
    })],
    getters:{
        allList:(state) => state.listCont
    },
    mutations:{
        AdddCont:(state,tab) => state.listCont.push(tab),
        DelCont:(state,index) => state.listCont.splice(index,1),
        EdCont: (state, tab, index) => state.listCont[index]=tab,
    },
    actions:{
        addCont:(state, tab) => state.commit('AdddCont',tab),
        deleteCont:(state, index) => state.commit('DelCont',index),
        editCont:(state, tab, index) => state.commit('EdCont',tab,index),
    },
});