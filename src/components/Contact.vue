<template>
    <div>
        <div class="page-container">
            <md-app md-mode="fixed">
                <md-app-toolbar class="md-primary">
                    <span class="md-title">Контакты</span>
                </md-app-toolbar>
            </md-app>
        </div>


        <div v-bind:class="[activeClass]">
            <div>
                <div>
                    <!--Просмотр/редактирование контактов-->
                    <md-dialog :md-active.sync="showDialog">
                        <md-dialog-title>Контакт</md-dialog-title>
                        <md-dialog-content >
                        <md-tabs md-dynamic-height >
                            <md-tab md-label="Просмотр">
                                <h2>{{contShow.name}}</h2> <br/>
                                <img :src="contShow.foto" width="150" height="150" />
                                <div>
                                    <br>Телефон:
                                    <div v-for="t in contShow.tel" >
                                        <span v-if="contShow.tel.length===(contShow.tel.indexOf(t)+1)">{{t.num}}</span>
                                        <span v-else>{{t.num}}, </span>
                                    </div>
                                    <br>E-mail:
                                    <div v-for="e in contShow.email" >
                                        <span v-if="contShow.email.length===(contShow.email.indexOf(e)+1)">{{e.mail}}</span>
                                        <span v-else>{{e.mail}}, </span>
                                    </div>

                                    <p>День рождения: {{contShow.dr_day+'-'+contShow.dr_month + '-' + contShow.dr_year}}</p>
                                    <a :href="'http://'+contShow.site">{{contShow.site}}</a>
                                    <p>Компания: {{contShow.company}}</p>
                                    <br>Относится к группам:
                                    <div v-for="e in contShow.group" >
                                        <span v-if="contShow.group.length===(contShow.group.indexOf(e)+1)">{{e}}</span>
                                        <span v-else>{{e}}, </span>
                                    </div>
                                </div>
                            </md-tab>

                            <md-tab md-label="Редактирование" >

                                <md-field>
                                    <label>ФИО:</label>
                                    <md-input v-model="contShow.name" placeholder="Введите имя">{{contShow.name}}</md-input>
                                </md-field>
                                <md-field v-for="te in contShow.tel">
                                    <label>Телефон:</label>
                                    <md-input v-model="te.num" v-mask="'\+38(\###\)\###\-\##\-\##'" placeholder="Введите номер телефона">{{te.num}}</md-input>
                                </md-field>
                                <md-button class="md-primary" @click="addPoleTel(contShow)">Добавить номер</md-button>

                                <md-field v-for="em in contShow.email">
                                    <label>E-mail:</label>
                                    <md-input v-model="em.mail" placeholder="Введите e-mail">{{em.mail}}</md-input>
                                </md-field>
                                <md-button class="md-primary" @click="addPoleMail(contShow)">Добавить e-mail</md-button>

                                <md-datepicker v-model="data_buff">
                                    <label>Выберите день рождения</label>
                                </md-datepicker>

                                <md-field>
                                    <label>Веб-сайт:</label>
                                    <md-input v-model="contShow.site" placeholder="Введите веб-сайт">{{contShow.site}}</md-input>
                                </md-field>

                                <md-field>
                                    <label>Компания:</label>
                                    <md-input v-model="contShow.company" placeholder="Введите Компанию">{{contShow.company}}</md-input>
                                </md-field>

                                <md-field>
                                    <md-select v-model="contShow.group" placeholder="Метки" multiple>
                                        <md-option value="friend">Друзья</md-option>
                                        <md-option value="kolegi">Коллеги</md-option>
                                    </md-select>
                                </md-field>

                            </md-tab>
                        </md-tabs>
                        </md-dialog-content>
                        <md-dialog-actions>
                            <md-button class="md-primary" @click="showDialog = false; clearBuffCont()">Закрыть</md-button>
                            <md-button class="md-primary" @click=" edit(contShow); ">Сохранить</md-button>
                        </md-dialog-actions>
                    </md-dialog>
                    <!--Добавление-->
                    <md-dialog :md-active.sync="showAddDialog">
                        <md-dialog-title>Новый Контакт</md-dialog-title>
                        <md-dialog-content>
                            <md-field>
                                <label>ФИО:</label>
                                <md-input v-model="contAdd.name" placeholder="Введите имя"></md-input>
                            </md-field>
                            <md-field v-for="te in contAdd.tel">
                                <label>Телефон:</label>
                                <md-input v-model="te.num" v-mask="'\+38(\###\)\###-##-##'" placeholder="Введите номер телефона"></md-input>

                            </md-field>
                            <md-button class="md-primary" @click="addPoleTel(contAdd)">Добавить номер</md-button>

                            <md-field v-for="em in contAdd.email">
                                <label>E-mail:</label>
                                <md-input type="email" v-model="em.mail" placeholder="Введите e-mail"></md-input>
                            </md-field>
                            <md-button class="md-primary" @click="addPoleMail(contAdd)">Добавить e-mail</md-button>

                            <md-datepicker v-model="data_buff">
                                <label>Выберите день рождения</label>
                            </md-datepicker>

                            <md-field>
                                <label>Веб-сайт:</label>
                                <md-input v-model="contAdd.site" placeholder="Введите веб-сайт"></md-input>
                            </md-field>

                            <md-field>
                                <label>Компания:</label>
                                <md-input v-model="contAdd.company" placeholder="Введите Компанию"></md-input>
                            </md-field>
                            <md-field>
                                <md-select v-model="contAdd.group" placeholder="Метки" multiple>
                                    <md-option value="friend">Друзья</md-option>
                                    <md-option value="kolegi">Коллеги</md-option>
                                </md-select>
                            </md-field>
                        </md-dialog-content>

                        <md-dialog-actions>
                            <md-button class="md-primary" @click="showAddDialog = false; clearAddCont()">Отмена</md-button>
                            <md-button class="md-primary" @click=" add(contAdd); ">Добавить</md-button>
                        </md-dialog-actions> 
                    </md-dialog>
                </div>
                <!-- Дни рождения -->
                <div>
                    <md-dialog :md-active.sync="showDrDialog">
                        <md-dialog-title>Дни рождения</md-dialog-title>
                        <md-dialog-content>
                            <md-list v-for="d in filterDR" >
                                <div>
                                    <md-list-item>
                                        <h3>{{d.name}}: {{d.dr_day+'.'+d.dr_month+'.'+d.dr_year}}</h3>
                                        <br>
                                    </md-list-item>
                                </div>
                            </md-list>

                        </md-dialog-content><!-- -->
                        <md-dialog-actions>
                            <md-button class="md-primary" @click="showDrDialog = false;">ОK</md-button>
                        </md-dialog-actions>
                    </md-dialog>
                </div>
                <md-button class="md-raised md-primary" @click=" clearAddCont(); showAddDialog = true; ">Добавить контакт</md-button>
                <md-button class="md-raised md-primary" @click=" showDrDialog = true; ">Дни рождения</md-button>


                <div class="md-layout-item">
                    <md-field>
                        <md-select v-model="metka"  placeholder="Поиск по меткам">
                            <md-option value="">Все</md-option>
                            <md-option value="friend">Друзья</md-option>
                            <md-option value="kolegi">Коллеги</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div>

                    <md-list  v-for="l in filteredList" v-bind:key="l.id">
                        <div>
                            <md-list-item>
                                <md-button @click="showContact(l)"> {{l.name}} </md-button>
                                <md-button class="md-raised md-primary" @click="del(l)" >Удалить</md-button>
                                <br>
                            </md-list-item>
                        </div>
                    </md-list>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

    import {mapActions} from 'vuex';

    export default {
        name: "Contact",
        data(){
           return {
               metka:'',
               data_buff: new Date(Date.now()),
               showDrDialog: false,
               showDialog: false,
               showAddDialog: false,
               activeClass: 'md-layout md-gutter md-alignment-center-center',
               contShow: {id:0, name:'',tel:[{id:1, num:''}],email:[{ mail:''}], dr_year: 0, dr_month: 0, dr_day: 0,site:'', company:'',group: [],foto:''},
               contAdd: {id:0, name:'',tel:[{id:1, num:''}],email:[{ mail:''}], dr_year: 0, dr_month: 0, dr_day: 0,site:'', company:'',group: [],foto:''}

           }
        },
        computed:{
            listContact: function () {
                return this.$store.getters.allList;
            },
            filteredList: function(){
                let met = this.metka;
                return this.listContact.filter(function (elem) {
                    if(met==='') return true;
                    if(elem.group.length===1) return elem.group[0].indexOf(met) > -1;
                    else {
                        for (let i = 0; i < elem.group.length; i++) {
                            if(met===elem.group[i]) return elem.group[i].indexOf(met) > -1;
                        }
                    }
                });
            },
            filterDR: function() {
                let today = new Date();
                today.setHours(0,0,0,0);
                let listDR=this.listContact;
                return listDR.sort( function (a,b) {
                    let nextDate = new Date([today.getFullYear(),a.dr_month,a.dr_day].join(','));
                    if (nextDate < today) nextDate.setFullYear((today.getFullYear())+1);
                    let nextDate1 = new Date([today.getFullYear(),b.dr_month,b.dr_day].join(','));
                    if (nextDate1 < today) nextDate1.setFullYear((today.getFullYear())+1);
                    let daysLeft = Math.round((nextDate.getTime() - today.getTime())/(24*60*60*1000));
                    let daysLeft1 = Math.round((nextDate1.getTime() - today.getTime())/(24*60*60*1000));

                    if (daysLeft > daysLeft1) {
                        return 1;
                    }
                    if (daysLeft < daysLeft1) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                });/**/
            }
        },
        methods:{
            ...mapActions(['deleteCont','addCont','editCont']),
            validEmail:function(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            RandomInt: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            add: function(tab){

                let max=this.listContact[0].id;
                for(let i=0;i<this.listContact.length-1;i++)
                {
                    if(max<this.listContact[i+1].id)
                    {
                        max=this.listContact[i+1].id;
                    }
                }
                tab.id = max+1;
                tab.dr_day = this.data_buff.getDate();
                tab.dr_month = this.data_buff.getMonth()+1;
                tab.dr_year = this.data_buff.getFullYear();
                tab.foto.split('/','.');
                let rand=this.RandomInt(1,100);
                for(let i=0;i<this.listContact.length;i++) {
                    if (this.listContact[i].foto.split('/','.')[this.listContact.length-1] === rand)
                    {
                        i=0;
                        rand=this.RandomInt(1,100);
                    }
                }
                tab.foto = 'https://randomuser.me/api/portraits/men/'+rand+'.jpg';
                if(tab.tel.length>1) {
                    for (let i = 0; i < tab.tel.length; i++) {
                        if (tab.tel[i].num.trim() === '') {
                            tab.tel.splice(i, 1);
                        }
                    }
                }
                if(tab.email.length>1) {
                    for (let i = 0; i < tab.email.length; i++) {
                        if (tab.email[i].mail.trim() === '') {
                            tab.email.splice(i, 1);
                        }
                    }
                }
                let kol=0;
                if(tab.email.length===1 && tab.email[0].mail.trim()==='') {
                    this.addCont(tab);
                    this.showAddDialog = false;
                    this.clearAddCont();
                }
                else {
                    for (let i = 0; i < tab.email.length; i++) {
                        if (!this.validEmail(tab.email[i].mail)) {
                            alert("E-mail №" + (i + 1) + " введен не правильно.");
                        } else {
                            kol++;
                        }
                    }
                    if(kol===tab.email.length)
                    {
                        this.addCont(tab);
                        this.showAddDialog = false;
                        this.clearAddCont();
                    }
                }
            },
            edit: function(tab){
                const index=this.listContact.indexOf(tab);
                tab.dr_day = this.data_buff.getDate();
                tab.dr_month = this.data_buff.getMonth()+1;
                tab.dr_year = this.data_buff.getFullYear();
                if(tab.tel.length>1) {
                    for (let i = 0; i < tab.tel.length; i++) {
                        if (tab.tel[i].num.trim() === '') {
                            tab.tel.splice(i, 1);
                        }
                    }
                }
                if(tab.email.length>1) {
                    for (let i = 0; i < tab.email.length; i++) {

                        if (tab.email[i].mail.trim() === '') {
                            tab.email.splice(i, 1);
                        }
                    }
                }
                let kol=0;
                if(tab.email.length===1 && tab.email[0].mail.trim()==='') {
                    this.editCont(tab, index);
                    this.showDialog = false;
                    this.clearBuffCont();
                }
                else{
                    for (let i = 0; i < tab.email.length; i++) {
                        if (!this.validEmail(tab.email[i].mail)) {
                            alert("E-mail №" + (i + 1) + " введен не правильно.");
                        }
                        else {
                            kol++;
                        }
                    }
                    if(kol===tab.email.length){
                        this.editCont(tab, index);
                        this.showDialog = false;
                        this.clearBuffCont();
                    }
                }
            },
            clearBuffCont: function(){
                this.contShow={id:0, name:'',tel:[{id:1, num:''}],email:[{id:1, mail:''}], dr_year: 0, dr_month: 0, dr_day: 0,site:'', company:'',group: [],foto:''};
            },
            clearAddCont: function(){
                this.contAdd={id:0, name:'',tel:[{id:1, num:''}],email:[{id:1, mail:''}], dr_year: 0, dr_month: 0, dr_day: 0,site:'', company:'',group: [],foto:''};
            },
            del: function(cont){
                const i = this.$store.getters.allList.indexOf(cont);
                this.deleteCont(i);
            },
            showContact: function (contact) {
                const i = this.listContact.indexOf(contact);
                this.contShow = this.listContact[i];
                this.data_buff = new Date(this.listContact[i].dr_year+'-'+this.listContact[i].dr_month+'-'+this.listContact[i].dr_day);
                this.showDialog = true;
            },
            addPoleTel: function (contElem) {
                contElem.tel.push({id:this.contShow.tel.length+1, num:''});
            },
            addPoleMail: function (contElem) {
                contElem.email.push({mail:''});
            }
        }

    };

</script>

<style lang="scss" scoped>

    small {
        display: block;
    }

    .md-app {
        text-align: center;
        max-height: 400px;
        border: 1px solid ;
        margin-bottom: 50px;
        font-family: Roboto;
    }
    .md-list {
        display: block;
        vertical-align: top;
        border: 1px solid rgba(#000, .12);
        border-radius: 10px;
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
        font-family: Roboto;
    }

    .md-button {
        display: inline-block;
        border-radius: 8px;
        font-family: Roboto;
    }

</style>