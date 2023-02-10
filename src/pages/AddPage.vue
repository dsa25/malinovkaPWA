<template>
  <div>
    <MyLabel for="datalistFor01" class="block mb-1"
      >Выбрать номер участка:
    </MyLabel>
    <MyDatalist
      @dataListValue="dataListValue"
      :options="addressList"
      :id="'datalistFor01'"
      :list="'datalist01'"
    />

    <div class="flex items-center mt-3">
      <MyLabel for="date_inspection" class="whitespace-nowrap pr-3"
        >Дата осмотра:
      </MyLabel>
      <MyInput
        id="date_inspection"
        v-model="myData.dateInspection"
        :type="'date'"
        class="disabled:opacity-50"
        disabled
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="number_PU" class="whitespace-nowrap pr-3"
        >Номер ПУ:
      </MyLabel>
      <MyInput
        v-model="myData.numberPU"
        id="number_PU"
        class="disabled:opacity-50"
        disabled
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="type_PU" class="whitespace-nowrap pr-3">Тип ПУ: </MyLabel>
      <MyInput
        v-model="myData.typePU"
        id="type_PU"
        class="disabled:opacity-50"
        disabled
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="date_pu" class="whitespace-nowrap pr-3"
        >Дата выпуска ПУ:
      </MyLabel>
      <MyInput
        :type="'date'"
        v-model="myData.datePU"
        :value="myData.datePU"
        id="date_pu"
      />
    </div>

    <MyLabel class="block mt-4 mb-1">Показания: </MyLabel>

    <div class="flex items-center mt-3">
      <MyLabel for="kp_day" class="whitespace-nowrap pr-3">КП день: </MyLabel>
      <MyInput
        v-model="myData.kpDay"
        :value="myData.kpDay"
        id="kp_day"
        inputmode="numeric"
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="kp_night" class="whitespace-nowrap pr-3">КП ночь: </MyLabel>
      <MyInput
        v-model="myData.kpNight"
        :value="myData.kpNight"
        id="kp_night"
        inputmode="numeric"
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="kp_total" class="whitespace-nowrap pr-5">Общее: </MyLabel>
      <MyInput v-model="myData.kpTotal" id="kp_total" inputmode="numeric" />
    </div>

    <div class="flex items-center pt-4">
      <div v-if="myData.srcPhoto" class="max-w-[50%]">
        <img :src="myData.srcPhoto" />
      </div>
      <div class="mx-auto p-1">
        <AddPhoto @change:file="getPhoto" />
      </div>
    </div>

    <div class="mt-3">
      <MyLabel for="notation" class="whitespace-nowrap pr-5 mb-1"
        >Примечания:
      </MyLabel>
      <MyTextarea
        v-model="myData.notation"
        id="notation"
        placeholder="Необязательно"
      />
    </div>

    <div class="flex items-center justify-between pt-5">
      <MyBtn class="btn_danger mr-3" @click="cancel">Отмена</MyBtn>
      <MyBtn class="btn_success" @click="save">Сохранить</MyBtn>
    </div>
  </div>
</template>

<script>
import { getTime, deepClone } from "@/func.js"
import { get as getDB, set as setDB } from "idb-keyval"

export default {
  name: "AddPage",
  props: {
    itemPage: String
  },
  data() {
    return {
      myData: {
        address: "",
        dateInspection: "",
        numberPU: "",
        typePU: "",
        datePU: "",
        kpDay: "",
        kpNight: "",
        kpTotal: "",
        srcPhoto: "",
        notation: ""
      },
      photo: "",
      addressList: [
        "A Throne Too Far",
        "The Cat Wasn't Invited",
        "You Only Meow Once",
        "Catless in Seattle"
      ]
    }
  },
  methods: {
    dataListValue(val) {
      this.myData.address = val
      this.myData.dateInspection = getTime("yyyy-mm-dd")
      this.myData.numberPU = "0123"
      this.myData.typePU = "0137"
    },
    getPhoto(event) {
      console.log(event)
      const files = event.target.files
      console.log({ files })
      console.log(files.length)
      if (files.length < 1) return

      console.log("files_length")
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => (this.myData.srcPhoto = reader.result)
    },
    async save() {
      try {
        console.log(this.myData)
        let list = await getDB("list")
        list = list ? list : []
        console.log({ list })
        list.push(deepClone(this.myData))
        console.log({ list })
        let res = await setDB("list", list)
        console.log({ res })
      } catch (e) {
        console.log(e)
      }
    },
    // save(val) {
    //   try {
    //     console.log(this.myData)
    //     let list = localStorage.getItem("list")
    //     list = list != null ? JSON.parse(list) : []
    //     list.push(this.myData)
    //     localStorage.setItem("list", JSON.stringify(list))
    //     // this.$emit("setPage", "list")
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },

    cancel(val) {
      console.log("valCancel", val)
      let list = localStorage.getItem("list")
      list = JSON.parse(list)
      console.log(list.length, list)
    }
  }
}
</script>
