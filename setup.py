# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in company_management/__init__.py
from company_management import __version__ as version

setup(
	name='company_management',
	version=version,
	description='App for various Management Functions of the Company',
	author='Systenics',
	author_email='info@systenics.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
