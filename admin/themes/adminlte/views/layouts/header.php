<?php
use yii\helpers\Html;
use yii\helpers\Url;
/* @var $this \yii\web\View */
/* @var $content string */
use common\models\Register;

use kartik\icons\Icon;

use common\models\Company;


$user = Yii::$app->user->identity;



use admin\models\FunctionCenter;

$Fnc = new FunctionCenter();
$Fnc->RegisterRule();

if(Yii::$app->session->get('Rules')['rules_id'] == '')
{
    $Fnc->RegisterRule();
    //echo '<script>window.location.href = "index.php?r=site/index";</script>';
}

if(Yii::$app->session->get('Rules')['comp_id']){
   $company = Company::findOne(Yii::$app->session->get('Rules')['comp_id']);

    //var_dump(Yii::$app->session->get('Rules')['comp_id']);
    //var_dump(Yii::$app->session->get('Rules')['comp_id']);
   // if($user->id==1)
   //  Yii::$app->name = '<img src="'.$company->logoViewer.'">';
}



//Yii::$app->name = '<img src="images/icon/ewinl.png">';
?>

<header class="main-header">

    <?php echo Html::a('<span class="logo-mini"><i class="fa fa-edge" aria-hidden="true"></i>win</span><span class="logo-lg">' . Yii::$app->name . '</span>', Yii::$app->homeUrl, ['class' => 'logo hidden-xs']) ?>

    <nav class="navbar navbar-static-top" role="navigation">

        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only">eWiNL Navigation</span>
        </a>
        <div class="Navi-Title">{{ Title }}</div>
        <div class="navbar-custom-menu">

            <ul class="nav navbar-nav">
                <!--  <li class="dropdown messages-menu hidden-xs">
                    <a href="#" id="minimize" onclick="toggleFullScreen(document.getElementById('minimize'))">
                    <i class="fa fa-window-restore" aria-hidden="true" ></i>
                    </a>
                </li> -->

                <!-- Messages: style can be found in dropdown.less-->
                <li class="dropdown messages-menu hidden-xs">
                    <?php
                    echo Html::a('<span id="CH"></span> &nbsp;&nbsp;  CH', Url::current(['language' => 'zh-CN']), ['class' => 'ch-CH']);

                    ?>
                </li>
                <li class="dropdown messages-menu hidden-xs">
                    <?php

                    echo Html::a('<span id="EN"></span> &nbsp;&nbsp;  EN',
                        Url::current(['language' => 'en-EN']), ['class' => 'en-US']);
                    ?>
                </li>
                <li class="dropdown messages-menu hidden-xs">

                    <?php
                    echo Html::a('<span id="TH"></span> &nbsp;&nbsp;  TH', Url::current(['language' => 'th-TH']), ['class' => 'th-TH']);

                    ?>
                </li>

                <li class="dropdown messages-menu hidden-xs">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-envelope-o"></i>
                        <span class="label label-success warning-message"><!></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">You have <span class="warning-message">?</span> messages</li>
                        <li>
                            <!-- inner menu: contains the actual data -->


                            <ul class="menu">
                                <li><!-- start message -->
                                    <a href="#">
                                        <div class="pull-left">
                                            <img src="<?= $directoryAsset ?>/img/user2-160x160.jpg" class="img-circle"
                                                 alt="User Image"/>
                                        </div>
                                        <h4>
                                            Support Team
                                            <small><i class="fa fa-clock-o"></i> 5 mins</small>
                                        </h4>
                                        <p>Why not buy a new awesome theme?</p>
                                    </a>
                                </li>
                                <!-- end message -->
                                <li>
                                    <a href="#">
                                        <div class="pull-left">
                                            <img src="<?= $directoryAsset ?>/img/user3-128x128.jpg" class="img-circle"
                                                 alt="user image"/>
                                        </div>
                                        <h4>
                                            AdminLTE Design Team
                                            <small><i class="fa fa-clock-o"></i> 2 hours</small>
                                        </h4>
                                        <p>Why not buy a new awesome theme?</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="pull-left">
                                            <img src="<?= $directoryAsset ?>/img/user4-128x128.jpg" class="img-circle"
                                                 alt="user image"/>
                                        </div>
                                        <h4>
                                            Developers
                                            <small><i class="fa fa-clock-o"></i> Today</small>
                                        </h4>
                                        <p>Why not buy a new awesome theme?</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="pull-left">
                                            <img src="<?= $directoryAsset ?>/img/user3-128x128.jpg" class="img-circle"
                                                 alt="user image"/>
                                        </div>
                                        <h4>
                                            Sales Department
                                            <small><i class="fa fa-clock-o"></i> Yesterday</small>
                                        </h4>
                                        <p>Why not buy a new awesome theme?</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="pull-left">
                                            <img src="<?= $directoryAsset ?>/img/user4-128x128.jpg" class="img-circle"
                                                 alt="user image"/>
                                        </div>
                                        <h4>
                                            Reviewers
                                            <small><i class="fa fa-clock-o"></i> 2 days</small>
                                        </h4>
                                        <p>Why not buy a new awesome theme?</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="footer"><a href="#">See All Messages</a></li>
                    </ul>
                </li>

                <li class="dropdown notifications-menu hidden-xs">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-bell-o"></i>
                        <span class="label label-warning warning-amount"><!></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header ">You have <span class="warning-amount">?</span> notifications</li>
                        <li>
                            <!-- inner menu: contains the actual data -->
                            <ul class="menu">
                                <?php
                                    $ulWarn = '';
                                    foreach (Register::find()->where(['status' => 'pending'])->all() as $value) {
                                        # code...

                                        $ulWarn.= '<li>
                                                        <a href="index.php?r=company/company/pending&id='.$value->id.'">
                                                            <i class="'.$value->regis->icon.'"></i>
                                                                '.$value->regis_name.' / '.$value->regis->name.'

                                                        </a>
                                                    </li>'."\r\n";
                                    }

                                    echo $ulWarn;
                                ?>
                                <!-- <li>
                                    <a href="#">
                                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-warning text-yellow"></i> Very long description here that may
                                        not fit into the page and may cause design problems
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-users text-red"></i> 5 new members joined
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i class="fa fa-shopping-cart text-green"></i> 25 sales made
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-user text-red"></i> You changed your username
                                    </a>
                                </li> -->
                            </ul>
                        </li>
                        <li class="footer"><a href="#">View all</a></li>
                    </ul>
                </li>
                <!-- Tasks: style can be found in dropdown.less -->
                <li class="dropdown tasks-menu hidden-xs">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-flag-o"></i>
                        <span class="label label-danger warning-task"><!></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">You have <span class="warning-task"><img src="images/icon/mini-loader.gif"></span> tasks</li>
                        <li>
                            <!-- inner menu: contains the actual data -->
                            <ul class="menu">
                                <li><!-- Task item -->
                                    <a href="#">
                                        <h3>
                                            Design some buttons
                                            <small class="pull-right">20%</small>
                                        </h3>
                                        <div class="progress xs">
                                            <div class="progress-bar progress-bar-aqua" style="width: 20%"
                                                 role="progressbar" aria-valuenow="20" aria-valuemin="0"
                                                 aria-valuemax="100">
                                                <span class="sr-only">20% Complete</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <!-- end task item -->
                                <li><!-- Task item -->
                                    <a href="#">
                                        <h3>
                                            Create a nice theme
                                            <small class="pull-right">40%</small>
                                        </h3>
                                        <div class="progress xs">
                                            <div class="progress-bar progress-bar-green" style="width: 40%"
                                                 role="progressbar" aria-valuenow="20" aria-valuemin="0"
                                                 aria-valuemax="100">
                                                <span class="sr-only">40% Complete</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <!-- end task item -->
                                <li><!-- Task item -->
                                    <a href="#">
                                        <h3>
                                            Some task I need to do
                                            <small class="pull-right">60%</small>
                                        </h3>
                                        <div class="progress xs">
                                            <div class="progress-bar progress-bar-red" style="width: 60%"
                                                 role="progressbar" aria-valuenow="20" aria-valuemin="0"
                                                 aria-valuemax="100">
                                                <span class="sr-only">60% Complete</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <!-- end task item -->
                                <li><!-- Task item -->
                                    <a href="#">
                                        <h3>
                                            Make beautiful transitions
                                            <small class="pull-right">80%</small>
                                        </h3>
                                        <div class="progress xs">
                                            <div class="progress-bar progress-bar-yellow" style="width: 80%"
                                                 role="progressbar" aria-valuenow="20" aria-valuemin="0"
                                                 aria-valuemax="100">
                                                <span class="sr-only">80% Complete</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <!-- end task item -->
                            </ul>
                        </li>
                        <li class="footer">
                            <a href="#">View all tasks</a>
                        </li>
                    </ul>
                </li>
                <!-- User Account: style can be found in dropdown.less -->

                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <?= Html::img($user->profile->getAvatarUrl(24), [
                            'class' => 'img-image',
                            'width' => '20px',
                            'alt' => $user->username,
                        ]) ?>
                        <!-- <img src="<?= $directoryAsset ?>/img/user2-160x160.jpg" class="user-image" alt="User Image"/> -->
                        <span class="hidden-xs"><?= $Profile->name ?></span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header">
                        <?= Html::img($user->profile->getAvatarUrl(24), [
                            'class' => 'img-circle',
                            'alt' => $user->username,
                        ]) ?>
                            <!-- <img src="<?= $directoryAsset ?>/img/user2-160x160.jpg" class="img-circle"
                                 alt="User Image"/> -->

                            <p> <?= $Profile->name ?>

                                <small>Member since Nov. 2012</small>
                            </p>
                        </li>
                        <!-- Menu Body -->
                        <li class="user-body">
                            <div class="col-xs-4 text-center">
                                <a href="index.php?r=admin">@admin</a>
                            </div>
                            <div class="col-xs-4 text-center">
                                <a href="#">Sales</a>
                            </div>
                            <div class="col-xs-4 text-center">
                                <a href="#">Friends</a>
                            </div>
                        </li>
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="index.php?r=user/settings/profile" class="btn btn-default btn-flat">Profile</a>
                            </div>
                            <div class="pull-right">
                                <?= Html::a(
                                    'Sign out',
                                    ['/site/logout'],
                                    ['data-method' => 'post', 'class' => 'btn btn-default btn-flat']
                                ) ?>
                            </div>
                        </li>
                    </ul>
                </li>

                <!-- User Account: style can be found in dropdown.less -->
                <li>
                    <a href="#" data-toggle="control-sidebar" class="open-slide-right"><i class="fa fa-gears"></i></a>

                </li>

            </ul>
        </div>
    </nav>
</header>
