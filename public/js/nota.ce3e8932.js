"use strict";(self["webpackChunknotasfrt"]=self["webpackChunknotasfrt"]||[]).push([[651],{5960:function(t,s,e){e.r(s),e.d(s,{default:function(){return l}});var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"container"},[s("h1",[t._v("Ruta privada!")]),s("table",{staticClass:"table"},[t._m(0),s("tbody",t._l(t.notas,(function(e,a){return s("tr",{key:a},[s("th",{attrs:{scope:"row"}},[t._v(t._s(e._id))]),s("td",[t._v(t._s(e.nombre))]),s("td",[t._v(t._s(e.descripcion))]),s("td",[t._v(t._s(e.date))])])})),0)])])},o=[function(){var t=this,s=t._self._c;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("#")]),s("th",{attrs:{scope:"col"}},[t._v("Nombre")]),s("th",{attrs:{scope:"col"}},[t._v("Descripción")]),s("th",{attrs:{scope:"col"}},[t._v("Fecha")]),s("th",{attrs:{scope:"col"}},[t._v("Acciones")])])])}],r=(e(4114),e(3518)),n={data(){return{notas:[]}},computed:{...(0,r.aH)(["token"])},methods:{...(0,r.i0)(["getTareas"]),listarNotas(){let t={headers:{token:this.token}};this.axios.get("/nota",t).then((t=>{this.notas=t.data})).catch((t=>{console.log(t.response)}))},agregarNota(){let t={headers:{token:this.token}};this.axios.post("/nueva-nota",this.nota,t).then((t=>{this.notas.push(t.data),this.nota.nombre="",this.nota.descripcion="",this.mensaje.color="success",this.mensaje.texto="Nota Agregada!",this.showAlert()})).catch((t=>{console.log(t.response),t.response.data.error.errors.nombre.message?this.mensaje.texto=t.response.data.error.errors.nombre.message:this.mensaje.texto="Error de sistema",this.mensaje.color="danger",this.showAlert()}))}},created(){this.getTareas(),this.listarNotas()}},c=n,i=e(1656),h=(0,i.A)(c,a,o,!1,null,null,null),l=h.exports}}]);
//# sourceMappingURL=nota.ce3e8932.js.map