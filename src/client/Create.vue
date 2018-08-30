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
    <b-form>
        <b-form-group>
            <b-input-group>
                <b-input-group-prepend>
                    <b-input-group-text>
                        <font-awesome-icon icon="file"></font-awesome-icon>
                    </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input placeholder="filename.md" pattern="\w+\.md" :required="true"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group>
            <b-form-textarea max-rows="15" :value="content"></b-form-textarea>
        </b-form-group>
        <b-form-row>
            <b-col md="4">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="at"></font-awesome-icon>
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input placeholder="username" :required="true"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col md="4">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="key"></font-awesome-icon>
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" placeholder="password" :required="true"></b-form-input>
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
<style>
</style>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey, faAt, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faKey, faAt, faFile);

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      content: '',
    };
  },
};
</script>
