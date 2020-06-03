/**
 *                                WikiBox
    ==================================================================== 
    - Homepage https://github.com/nzt/wikibox
    - Copyright (c) 2020 TANIGUCHI Masaya All Right Reserved.

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
 */
import { html } from "htm/preact";
import { useEffect, useState } from "preact/hooks";

export default ({ filename }) => {
  const [state, dispatch] = useState({ source: "" });
  useEffect(() => {
    fetch(filename)
      .then((response) => response.text())
      .then((source) => dispatch({ source }));
  }, [filename]);
  return html`
    <div
      class="container"
      dangerouslySetInnerHTML="${{ __html: state.source }}"
    />
  `;
};
