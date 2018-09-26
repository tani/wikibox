<?php
const USERS=[
    'admin'=>'$2y$10$L2bkVVRg1hTJxxEv.Y7UjeAVIWWnT7NhBBshZlWs8JIsMT1p.CtDa'
];
const LIMIT=60*60; // keeps 1 hour / session
const DATABASE='db.json'; // { address: string, token: string, data:  }[]

if(!file_exists(DATABASE)) {
    file_put_contents(DATABASE,'{}');
}