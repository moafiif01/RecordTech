<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrainingsTable extends Migration
{
	public function up()
	{
		if (! Schema::hasTable('trainings')) {
			Schema::create('trainings', function (Blueprint $table) {
				$table->id();
				$table->string('title');
				$table->text('description')->nullable();
				$table->timestamps();
			});
		}
	}

	public function down()
	{
		Schema::dropIfExists('trainings');
	}
}

