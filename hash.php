<?php
    $hash = '';
    if(isset($_POST['frase']) && isset($_POST['type']) && isset($_POST['data'])) {
        $hash = hash_hmac($_POST['type'], $_POST['data'], $_POST['frase']);
    }
?>

<html>
<body>
    
    <form action="./hash.php" method="post">
        <select name="type">
            <?php foreach(hash_algos() as $hash_type) { ?>
                <option value="<?=$hash_type?>"><?=$hash_type?></option>
            <?php } ?>
        </select>
        data: <input type="text" name="data">
        frase: <input type="text" name="frase">
        <button type="submit">submit</button>
    </form>

    <?php if(!empty($hash)){ ?>hash result: <?=$hash?><?php } ?>
</body>
</html>