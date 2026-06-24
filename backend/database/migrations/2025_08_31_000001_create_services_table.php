<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
	public function up()
	{
		// This migration was duplicated; the real create is in 2025_10_27_000002_create_services_table.php
		// Keep as no-op to avoid class not found errors.
		if (! Schema::hasTable('services')) {
			Schema::create('services', function (Blueprint $table) {
				$table->id();
				$table->string('title');
				$table->text('description')->nullable();
				$table->string('icon')->nullable();
				$table->string('price')->nullable();
				$table->timestamps();
			});
		}
	}

	public function down()
	{
		Schema::dropIfExists('services');
	}
}

