<template>
  <div>
    <MyLabel for="datalistFor01" class="block mb-1"
      >Выбрать номер участка:
    </MyLabel>
    <MyDatalist
      v-model="myData.address"
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

    <div class="flex items-center mt-3">
      <MyLabel for="user_1" class="whitespace-nowrap pr-3"
        >Исполнитель:
      </MyLabel>
      <MySelect
        v-model="myData.user"
        :value="myData.user"
        :options="usersForSelect"
        id="user_1"
      />
    </div>

    <div class="flex items-center justify-between pt-5">
      <MyBtn class="btn_danger mr-3" @click="cancel">Отмена</MyBtn>
      <MyBtn class="btn_success" @click="save">Сохранить</MyBtn>
    </div>

    <div>{{ inspections.length }}</div>
    <div>{{ myData.address }}</div>
    <div>{{ userName }}</div>
  </div>
</template>

<script>
import { ref } from "vue"
import { getTime } from "@/func.js"
import useInspections from "@/hooks/useInspections"
import useUsers from "@/hooks/useUsers"
import usePhoto from "@/hooks/usePhoto"

export default {
  name: "AddPage",
  props: {
    itemPage: String
  },
  data() {
    return {
      addressList: [
        { id: 1, text: 'СНТ "МАЛИНОВКА" ул. 2 А' },
        { id: 2, text: "ЖАСМИНОВАЯ (МКР 2-Б) ул. 7" },
        { id: 3, text: 'СНТ "МАЛИНОВКА", 9-Й КВ-Л ул. 7' },
        { id: 4, text: 'СНТ "МАЛИНОВКА" ул. 7' },
        { id: 5, text: 'СНТ "МАЛИНОВКА", 9-Й КВ-Л ул. 7' },
        { id: 6, text: 'СНТ "МАЛИНОВКА" ул. 8' }
      ]
    }
  },
  setup(props) {
    let myData = ref({
      user: "",
      address: "",
      dateInspection: "",
      numberPU: "",
      typePU: "",
      datePU: "",
      kpDay: "",
      kpNight: "",
      kpTotal: "",
      srcPhoto: "",
      notation: "",
      idLoc: 0,
      status: 0
    })

    const { userName, usersForSelect, updateUserName } = useUsers()
    const { inspections, addInspection, sendInspection } = useInspections()
    const { getCompressPhoto } = usePhoto()

    return {
      myData,
      addInspection,
      sendInspection,
      inspections,
      usersForSelect,
      userName,
      updateUserName,
      getCompressPhoto
    }
  },
  methods: {
    dataListValue(val) {
      this.myData.address = val
      this.myData.dateInspection = getTime("yyyy-mm-dd")
      this.myData.numberPU = "0123"
      this.myData.typePU = "0137"
    },
    async getPhoto(event) {
      try {
        // console.log(event)
        const file = event.target.files[0]
        // console.log({ file })
        this.myData.srcPhoto = file
          ? await this.getCompressPhoto(file)
          : undefined

        console.log({ srcPhoto: this.myData.srcPhoto })
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      try {
        // console.log(this.myData)
        // let list = await getDB("list")
        // list = list ? list : []
        // console.log({ list })
        // list.push(deepClone(this.myData))
        // console.log({ list })
        // let res = await setDB("list", list)
        // console.log({ res })
        this.myData.idLoc = this.inspections.length + 1
        await this.addInspection(this.myData)
        await this.updateUserName(this.myData.user)
        await this.sendInspection(this.myData)
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
    //     // this.$emit("setPage", "inspections")
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
