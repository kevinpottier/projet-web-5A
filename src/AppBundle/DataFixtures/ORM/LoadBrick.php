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
        for ($i = 0; $i < 8; $i++) {

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

                
                $brick->setHp(4);
                $brick->setSchemaNumber(2);

                $manager->persist($brick);
            }
        }


        // scheme 3, teleport bricks test
        //brick 1
        $brick = new Brick();
        $brick->setXaxis(20+2*80);
        $brick->setYaxis(50+3*25);
        $brick->setPower('teleport');
        $brick->setHp(4);
        $brick->setSchemaNumber(3);
        $manager->persist($brick);

        // brick 2
        $brick = new Brick();
        $brick->setXaxis(20+9*80);
        $brick->setYaxis(50+3*25);
        $brick->setPower('teleport');
        $brick->setHp(4);
        $brick->setSchemaNumber(3);
        $manager->persist($brick);



        // scheme 4
        for ($i = 0; $i < 7; $i++) {

            for ($j = 0; $j < 12; $j++) {

                if($i == 2 || $i == 4){

                    continue;
                }

                $brick = new Brick();
                $brick->setXaxis(20+$j*80);
                $brick->setYaxis(50+$i*25);

                
                if($i == 3 && ($j == 1 || $j == 10) ){

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

                $brick->setSchemaNumber(4);
                $brick->setHp(4);
                $manager->persist($brick);
            }
        }

        $manager->flush();
    }
}