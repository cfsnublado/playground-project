# Generated by Django 3.0.5 on 2020-05-03 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Foo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='label_name')),
                ('description', models.TextField(blank=True, verbose_name='label_description')),
            ],
        ),
    ]