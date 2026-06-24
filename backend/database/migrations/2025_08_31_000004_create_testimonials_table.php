<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestimonialsTable extends Migration
{
	public function up()
	{
		if (! Schema::hasTable('testimonials')) {
			Schema::create('testimonials', function (Blueprint $table) {
				$table->id();
				$table->string('author')->nullable();
				$table->text('message');
				$table->timestamps();
			});
		}
	}

	public function down()
	{
		Schema::dropIfExists('testimonials');
	}
}

