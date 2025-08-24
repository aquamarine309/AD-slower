import AutobuyerBox from "./AutobuyerBox.js";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton.js";
import DimensionBulkButton from "./DimensionBulkButton.js";

export default {
  name: "DimensionAutobuyerBox",
  components: {
    DimensionBulkButton,
    AutobuyerBox,
    AutobuyerIntervalButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      mode: AUTOBUYER_MODE.BUY_SINGLE,
      isUnlocked: false
    };
  },
  computed: {
    autobuyer() {
      return Autobuyer.antimatterDimension(this.tier);
    },
    name() {
      return `${AntimatterDimension(this.tier).shortDisplayName} Dimension Autobuyer`;
    },
    modeDisplay() {
      switch (this.mode) {
        case AUTOBUYER_MODE.BUY_SINGLE: return "Buys singles";
        case AUTOBUYER_MODE.BUY_10: return "Buys max";
      }
      throw "Unknown Dimension Autobuyer mode";
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.autobuyer.canBeUpgraded;
      this.mode = this.autobuyer.mode;
    },
    toggleMode() {
      this.autobuyer.toggleMode();
      this.update();
    }
  },
  template: `
  <AutobuyerBox
    :autobuyer="autobuyer"
    :name="name"
    show-interval
  >
    <template #intervalSlot>
      <DimensionBulkButton :autobuyer="autobuyer" />
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template #toggleSlot>
      <button
        v-if="isUnlocked"
        class="o-autobuyer-btn"
        @click="toggleMode"
      >
        {{ modeDisplay }}
      </button>
      <button
        v-else
        class="o-autobuyer-btn o-autobuyer-btn--unavailable"
      >
        Complete the challenge to change mode
      </button>
    </template>
  </AutobuyerBox>
  `
};