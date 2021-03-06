<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Brick;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class LoadBrick extends Fixture
{
    public function load(ObjectManager $manager)
    {    

        // scheme 1, bricks spaced out
        for ($i = 0; $i < 6; $i++) {

            for ($j = 0; $j < 10; $j++) {
                $brick = new Brick();
                $brick->setXaxis(20+$j*100);
                $brick->setYaxis(20+$i*30);
                $brick->setHp(1);
                $brick->setSchemaNumber(1);
                $brick->setPower('');
                $manager->persist($brick);
            }
        }


        // scheme 2, bricks sticked
        for ($i = 0; $i < 7; $i++) {

            for ($j = 0; $j < 12; $j++) {
                $brick = new Brick();
                $brick->setXaxis(20+$j*80);
                $brick->setYaxis(50+$i*25);

                //tests power
                if($i == 6 && $j == 4){
                  $brick->setPower('slowball');
                }
                else if($i == 6 && $j == 7){
                  $brick->setPower('superball');
                }else if($i == 6 && $j == 5){
                  $brick->setPower('cloneball');
                }else if($i == 6 && $j == 6){
                  $brick->setPower('cloneball');
                }
                else if($i == 6 && $j == 0)
                    //test undestructible brick
                    $brick->setpower('undestructible');
                else
                    $brick->setPower('');

                
                $brick->setHp(2);
                $brick->setSchemaNumber(2);

                $manager->persist($brick);
            }
        }


        // scheme 3
        for ($i = 0; $i < 8; $i++) {

            for ($j = 0; $j < 12; $j++) {
                $brick = new Brick();
                $brick->setXaxis(20+$j*80);
                $brick->setYaxis(25+$i*25);

                if( ( ($j == 2 || $j == 9) && ($i == 1 || $i == 2 || $i == 4 || $i == 5) )
                        || ( ($j == 5 || $j == 6) && ($i == 1 || $i == 2 || $i == 4 || $i == 5) ) ){

                    //void
                    continue;
                }
                else if( $j == 3
                        || $j ==  8
                        || ($i == 7 && ($j == 1 || $j == 2 || $j == 9 || $j == 10) ) ){

                    //undestructible
                    $brick->setPower('undestructible');

                }
                else if( ($i == 3 && ($j == 1 || $j == 10) )
                        || ( ($i == 0 || $i == 6) && ($j == 2 || $j == 9) ) ){

                    //cloneball
                    $brick->setPower('cloneball');
                }
                else if( $i == 3
                        && ($j == 2 || $j == 5 || $j == 6 || $j == 9) ){

                    //teleport
                    $brick->setPower('teleport');
                }
                else{

                    //other
                    $brick->setPower('');
                }

                
                $brick->setHp(2);
                $brick->setSchemaNumber(3);

                $manager->persist($brick);
            }
        }



        // scheme 4
        for ($i = 0; $i < 7; $i++) {

            for ($j = 0; $j < 12; $j++) {

                if($i == 2 || $i == 4){

                    continue;
                }

                $brick = new Brick();
                $brick->setXaxis(20+$j*80);
                $brick->setYaxis(50+$i*25);

                
                if($i == 3 && ($j == 2 || $j == 9) ){

                    $brick->setPower('teleport');
                }
                else if($i == 3 && ($j != 1 || $j != 10) ){

                    $brick->setPower('undestructible');
                }
                else if( ($i == 0 && $j == 3) 
                            || ($i == 0 && $j == 8) ){

                    $brick->setPower('cloneball');
                }
                else if( ($i == 5 && $j == 0) 
                            || ($i == 6 && $j == 11) ){

                    $brick->setPower('superball');
                }
                else if( ($i == 6 && $j == 0) 
                            || ($i == 5 && $j == 11) ){

                    $brick->setPower('slowball');
                }
                else{

                    $brick->setPower('');
                }


                $brick->setHp(2);
                $brick->setSchemaNumber(4);
                $manager->persist($brick);
            }
        }

        $manager->flush();
    }
}