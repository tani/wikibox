<!--
                                Rakugaki
    ====================================================================
    - Homepage https://github.com/asciian/Rakugaki
    - Copyright (c) 2018 TANIGUCHI Masaya All Right Reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<template>
    <b-form :action="`/${filename}`" method="POST">
        <b-form-group>
            <b-input-group>
                <b-input-group-prepend>
                    <b-input-group-text>
                        <font-awesome-icon icon="file"></font-awesome-icon>
                    </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input :value="filename" name="filename" placeholder="filename.md" type="text" pattern="\w+\.md" required></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group>
            <b-form-textarea name="content"></b-form-textarea>
        </b-form-group>
        <b-form-row>
            <b-col md="4">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="at"></font-awesome-icon>
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input name="username" type="text" placeholder="username" required></b-form-input>
                </b-input-group>
            </b-col>
            <b-col md="4">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="key"></font-awesome-icon>
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input name="password" type="password" placeholder="password" required></b-form-input>
                </b-input-group>
            </b-col>
            <b-col md="2">
                <b-button type="submit">Submit</b-button>
            </b-col>
            <b-col md="2">
                <b-button v-on:click="$router.go(-1)">Cancel</b-button>
            </b-col>
        </b-form-row>
    </b-form>
</template>
<script lang="ts">
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faKey, faAt, faFile } from "@fortawesome/free-solid-svg-icons";
declare function require(x: string): any;
const { FontAwesomeIcon } = require("@fortawesome/vue-fontawesome");
library.add(faKey, faAt, faFile);
export default Vue.extend({
  components: { FontAwesomeIcon },
  data(){ return { filename: "" } }
})
</script>
